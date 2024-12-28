import { defineConfig } from "vite";

export default defineConfig({
  root: ".",              // La raíz sigue siendo el directorio principal
  publicDir: "public",    // Archivos estáticos (donde está `index.html`)
  build: {
    outDir: "dist",       // Donde irán los archivos de construcción
    sourcemap: true,      // Mapas fuente para depuración
  },
  server: {
    open: "public/index.html", // Abrir `index.html` desde `public` en el navegador
  },
});