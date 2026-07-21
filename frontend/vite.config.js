// Importa a configuração do Vite
import { defineConfig } from "vite";

// Plugin React
import react from "@vitejs/plugin-react";

// Plugin Tailwind
import tailwindcss from "@tailwindcss/vite";

// Configuração do Vite
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});