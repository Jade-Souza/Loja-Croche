import { Navigate } from "react-router-dom";


export default function RotaPrivada({ children }) {
  const adminLogado =
    localStorage.getItem("adminLogado");

  if (!adminLogado) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}