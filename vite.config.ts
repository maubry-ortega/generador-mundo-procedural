import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    root: ".",
    publicDir: "public",
    build: {
        outDir: "dist",
        sourcemap: true,
    },
    server: {
        open: "public/index.html",
    },
    plugins: [tsconfigPaths()],
});