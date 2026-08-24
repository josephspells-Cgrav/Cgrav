import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Standalone V2 roofing site (Summit & Oak). Separate project — no AM template
// coupling. React + framer-motion for deep cinematic scroll motion, Tailwind v4.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
