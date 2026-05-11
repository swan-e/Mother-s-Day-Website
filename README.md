# 🌸 Mother's Day Gallery

A handmade, password-protected photo gallery built as a personal gift. Features a WebGL-powered infinite circular gallery, animated typography, and a warm navy + linen design. All deployed on Vercel.

### USE PASSWORD "GUESTPASS" TO ACCESS GUEST VIEW

---

## ✨ Features

- **Dual-mode access** — owner password shows personal photos; a separate guest password shows sample images for portfolio demos
- **Password-protected entrance** — only intended recipients can view the gallery
- **WebGL infinite scroll gallery** — smooth, momentum-based dragging and scrolling powered by OGL
- **Center-crop shader** — landscape photos are automatically cropped to center in the WebGL canvas rather than stretched or distorted
- **Animated text** — letter-by-letter entrance animation using GSAP SplitText
- **Dynamic photo count** — supports any number of photos up to a configurable `MAX_PHOTOS` ceiling, no code changes needed
- **Mode-aware messaging** — page text changes based on whether the owner or a guest is viewing
- **Private photos** — Cloudinary URLs stored as environment variables, keeping the repo fully public without exposing personal images

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js + TypeScript |
| Styling | Tailwind CSS |
| 3D / WebGL | OGL (lightweight WebGL library) |
| Animation | GSAP SplitText |
| Photo Hosting | Cloudinary |
| Deployment | Vercel |

---

## 🚀 Running Locally

**1. Clone the repo**
```bash
git clone https://github.com/swan-e/Mother-s-Day-Website
cd Mother-s-Day-Website
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env.local` file in the root:
```env
# Passwords
NEXT_PUBLIC_GALLERY_PASSWORD=your_owner_password
NEXT_PUBLIC_GUEST_PASSWORD=your_guest_password

# Photos (add as many as needed up to MAX_PHOTOS in GalleryCanvas.tsx)
NEXT_PUBLIC_PHOTO_1=https://res.cloudinary.com/your-cloud/image/upload/photo1
NEXT_PUBLIC_PHOTO_2=https://res.cloudinary.com/your-cloud/image/upload/photo2
# ...
```

**4. Run the dev server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🔐 Privacy

Photos are personal and not included in the repository. All Cloudinary URLs are stored as `NEXT_PUBLIC_PHOTO_*` environment variables — set them in Vercel's dashboard or a local `.env.local` file. The repo can remain fully public without exposing any images.

The guest password can be shared publicly (e.g. in this README) to let anyone demo the app with sample Cloudinary images, while the owner password keeps personal photos private.

**Guest password: `guest`**

---

## 📁 Project Structure

```
├── app/
│   ├── page.tsx            # Main page — login, mode routing, gallery layout
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles + navy swirl background
├── components/
│   ├── GalleryCanvas.tsx   # Photo arrays, preload logic, mode-aware image selection
│   ├── CircularGallery.tsx # WebGL infinite scroll carousel
│   └── SplitText.tsx       # GSAP letter animation component
└── public/                 # Static assets (no photos committed)
```

---

## 💡 Technical Highlights

### Dual-Mode Access
Two passwords unlock two different experiences. The owner sees personal photos and personalized messaging; guests see sample Cloudinary images with portfolio-friendly copy. Mode is stored in React state and passed down to all components.

### Dynamic Photo Count
Owner photos are loaded dynamically from env variables up to a configurable ceiling:

```ts
const MAX_PHOTOS = 50;

const ownerImages = Array.from({ length: MAX_PHOTOS }, (_, i) =>
  process.env[`NEXT_PUBLIC_PHOTO_${i + 1}`]
).filter(Boolean) as string[];
```

Add a new photo by simply adding a new `NEXT_PUBLIC_PHOTO_N` env variable — no code changes needed.

### WebGL Center-Crop Shader
Landscape photos are cropped to their center rather than scaled, preserving the most important part of each image. Handled entirely in the GLSL fragment shader by comparing the image's aspect ratio to the mesh's aspect ratio and adjusting UV coordinates:

```glsl
if (uAspect > meshAspect) {
  // Landscape: crop left/right
  float scale = meshAspect / uAspect;
  uv.x = (uv.x - 0.5) * scale + 0.5;
} else {
  // Portrait: crop top/bottom
  float scale = uAspect / meshAspect;
  uv.y = (uv.y - 0.5) * scale + 0.5;
}
```

### Infinite Scroll
The gallery wraps infinitely in both directions using modular arithmetic on each mesh's x position, giving a seamless carousel feel with momentum-based easing.

---

## 📬 Contact

Built with love by [@swan-e](https://github.com/swan-e)