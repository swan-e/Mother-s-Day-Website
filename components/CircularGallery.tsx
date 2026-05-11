'use client';

import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Mesh,
  Program,
  Texture,
} from 'ogl';
import { images } from './GalleryCanvas';
import { useEffect, useRef } from 'react';

const MESH_WIDTH = 1.8;
const MESH_HEIGHT = 2.4;
const MESH_ASPECT = MESH_WIDTH / MESH_HEIGHT; // 0.75 (portrait)

const loadTexture = (gl: any, src: string, onAspect: (aspect: number) => void) => {
  const texture = new Texture(gl);
  texture.generateMipmaps = false;
  texture.minFilter = gl.LINEAR;
  texture.magFilter = gl.LINEAR;
  texture.image = new Uint8Array([0, 0, 0, 255]);

  const img = new Image();
  img.decoding = 'async';
  img.src = src;
  img.onload = () => {
    texture.image = img;
    texture.needsUpdate = true;
    // Pass back the real image aspect ratio so shader can crop correctly
    onAspect(img.naturalWidth / img.naturalHeight);
  };

  return texture;
};

export default function CircularGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const dpr = Math.min(window.devicePixelRatio, 2);

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: dpr > 1.5 ? 1.5 : dpr,
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.background = 'transparent';
    containerRef.current.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.z = 5;

    const scene = new Transform();

    const geometry = new Plane(gl, {
      widthSegments: 10,
      heightSegments: 10,
    });

    const spacing = 2.6;
    const totalWidth = images.length * spacing;
    const meshes: Mesh[] = [];

    const scroll = { current: 0, target: 0, velocity: 0 };
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    images.forEach((src, i) => {
      // uAspect starts at 1.0; updated once image loads
      const aspectUniform = { value: 1.0 };

      const texture = loadTexture(gl, src, (aspect) => {
        aspectUniform.value = aspect;
      });

      const program = new Program(gl, {
        vertex: `
          precision highp float;
          attribute vec3 position;
          attribute vec2 uv;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 2.0 + uTime) * 0.02;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragment: `
          precision highp float;
          uniform sampler2D tMap;
          uniform float uAspect;
          varying vec2 vUv;

          void main() {
            float meshAspect = ${MESH_ASPECT.toFixed(6)};
            vec2 uv = vUv;

            if (uAspect > meshAspect) {
              // Landscape image: crop left/right, keep center
              float scale = meshAspect / uAspect;
              uv.x = (uv.x - 0.5) * scale + 0.5;
            } else {
              // Portrait image: crop top/bottom, keep center
              float scale = uAspect / meshAspect;
              uv.y = (uv.y - 0.5) * scale + 0.5;
            }

            gl_FragColor = texture2D(tMap, uv);
          }
        `,
        uniforms: {
          tMap: { value: texture },
          uTime: { value: 0 },
          uAspect: aspectUniform,
        },
        transparent: true,
      });

      const mesh = new Mesh(gl, { geometry, program });
      mesh.scale.set(MESH_WIDTH, MESH_HEIGHT, 1);
      mesh.position.x = i * spacing;
      mesh.setParent(scene);
      (mesh as any).index = i;
      meshes.push(mesh);
    });

    const resize = () => {
      const w = containerRef.current!.clientWidth;
      const h = containerRef.current!.clientHeight;
      renderer.setSize(w, h);
      camera.perspective({ aspect: w / h });
    };

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('wheel', (e) => {
      scroll.target -= e.deltaY * 0.01;
      scroll.velocity -= e.deltaY * 0.0003;
    });

    window.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.clientX;
      startScroll = scroll.target;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const delta = e.clientX - startX;
      scroll.target = startScroll - delta * 0.01;
    });

    window.addEventListener('mouseup', () => { isDown = false; });

    let frame = 0;
    const update = (t: number) => {
      frame = requestAnimationFrame(update);

      scroll.target += scroll.velocity;
      scroll.velocity *= 0.92;
      scroll.current += (scroll.target - scroll.current) * 0.08;

      meshes.forEach((m, i) => {
        const baseX = i * spacing;
        let x = baseX - scroll.current;
        x = ((x + totalWidth / 2) % totalWidth + totalWidth) % totalWidth - totalWidth / 2;

        m.position.x = x;

        const dist = Math.abs(x);
        const scale = Math.max(1, 1.35 - dist * 0.06);
        m.scale.set(scale * MESH_WIDTH, scale * MESH_HEIGHT, 1);
        m.program.uniforms.uTime.value = t * 0.001;
      });

      renderer.render({ scene, camera });
    };

    update(0);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}