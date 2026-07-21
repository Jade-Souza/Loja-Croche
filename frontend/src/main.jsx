// Importa o React
import React from "react";

// Importa o ReactDOM para renderizar a aplicação
import ReactDOM from "react-dom/client";

// Importa os estilos globais (Tailwind)
import "./index.css";

// Importa o componente principal
import App from "./App";

// Renderiza a aplicação dentro da div root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);