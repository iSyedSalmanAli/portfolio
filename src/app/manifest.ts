import type { MetadataRoute } from "next";

// Android masks home-screen icons into a circle and crops roughly a fifth off
// each edge, so the maskable variant carries a smaller glyph with room to spare.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Syed Salman Ali — Cloud Team Lead",
    short_name: "Salman Ali",
    description:
      "Cloud Team Lead at AKSIQ, architecting multi-region AWS infrastructure serving 22+ clients.",
    start_url: "/",
    display: "standalone",
    background_color: "#060a11",
    theme_color: "#060a11",
    icons: [
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
