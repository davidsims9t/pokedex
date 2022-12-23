import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    root: ".",
    test: {
        environment: 'jsdom',
        setupFiles: './vitest-setup.js',
    },
});