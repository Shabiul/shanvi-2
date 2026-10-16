import type { NextConfig } from "next";

const legacyPages = [
  "about",
  "services",
  "fleet",
  "gallery",
  "contact",
  "blog",
  "21-seater-bus-rental-bangalore",
  "blog-21-seater-mini-bus-rental-bangalore",
  "blog-tempo-traveller-vs-21-seater-bus",
  "blog-weekend-road-trips-bangalore-21-seater",
  "blog-corporate-team-outing-bus-bangalore",
];

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // Old PHP URLs keep their search equity: /about.php -> /about (301).
    return [
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/index_comingsoon.html", destination: "/", permanent: true },
      ...legacyPages.map((p) => ({ source: `/${p}.php`, destination: `/${p}`, permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
        ],
      },
    ];
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
