import { Link } from "react-router-dom";

export default function SidebarAdmin() {
  return (
    <aside
      style={{
        width: "260px",
        minHeight: "100vh",
        backgroundColor: "#7A4E3A",
        color: "white",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        Eliz Crochê
      </h2>

      <Link
        to="/admin"
        style={linkStyle}
      >
        📊 Dashboard
      </Link>

      <Link
        to="/admin/produtos"
        style={linkStyle}
      >
        🧶 Produtos
      </Link>

      <Link
        to="/admin/pedidos"
        style={linkStyle}
      >
        📦 Pedidos
      </Link>

      <Link
        to="/admin/clientes"
        style={linkStyle}
      >
        👤 Clientes
      </Link>

      {/* NOVO */}
      <Link
        to="/admin/encomendas"
        style={linkStyle}
      >
        ✨ Encomendas
      </Link>

      <div
        style={{
          marginTop: "auto",
        }}
      >
        <Link
          to="/"
          style={linkStyle}
        >
          🏠 Voltar à Loja
        </Link>
      </div>
    </aside>
  );
}

const linkStyle = {
  display: "block",
  textDecoration: "none",
  color: "white",
  padding: "14px",
  borderRadius: "10px",
  marginBottom: "10px",
  backgroundColor: "rgba(255,255,255,0.08)",
};