import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "oopsaninha",
    short_name: "oopsaninha",
    description: "seu conteúdo, no seu ritmo.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfbf9",
    theme_color: "#fcfbf9",
    lang: "pt-BR",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
