import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

// Do not add @vitejs/plugin-react here. Ladle 5.1.1 runs Vite 6 and
// injects its own React plugin. The root Vite 8 plugin uses a Rolldown
// refresh wrapper that throws "Missing field moduleType" in that pipeline.
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
})
