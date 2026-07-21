import { Navigate } from "react-router-dom";

export default function RotaPrivadaCliente({ children }) {
  const clienteLogado = localStorage.getItem("clienteLogado");

  if (!clienteLogado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}