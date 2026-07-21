import { NavLink, Link } from "react-router-dom";
import dashboardIcon from "../../assets/icones/layout-dashboard.svg";
import packageIcon from "../../assets/icones/package.svg";
import usersIcon from "../../assets/icones/users.svg";
import shoppingBagIcon from "../../assets/icones/shopping-bag.svg";
import sparklesIcon from "../../assets/icones/sparkles.svg";
import homeIcon from "../../assets/icones/home.svg";

<NavLink
  to="/admin"
  style={({ isActive }) => ({
    ...linkStyle,
    backgroundColor: isActive
      ? "#C97C8C"
      : "rgba(255,255,255,0.08)",
  })}
></NavLink>

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
          fontSize: "28px",
          fontWeight: "600",
          letterSpacing: "1px",
        }}
      >
        Eliz Crochê
      </h2>

      <p
      style={{
        textAlign: "center",
        color: "#E8D8D2",
        fontSize: "14px",
        marginTop: "-25px",
        marginBottom: "40px",
      }}
    >
      Painel Administrativo
    </p>

      <Link to="/admin" style={linkStyle}>
        <img src={dashboardIcon} alt="" style={iconStyle} />
        Dashboard
      </Link>

      <Link to="/admin/produtos" style={linkStyle}>
        <img src={shoppingBagIcon} alt="" style={iconStyle} />
        Produtos
      </Link>

      <Link to="/admin/pedidos" style={linkStyle}>
        <img src={packageIcon} alt="" style={iconStyle} />
        Pedidos
      </Link>

      <Link to="/admin/clientes" style={linkStyle}>
        <img src={usersIcon} alt="" style={iconStyle} />
        Clientes
      </Link>

      {/* NOVO */}
      <Link to="/admin/encomendas" style={linkStyle}>
        <img src={sparklesIcon} alt="" style={iconStyle} />
        Encomendas
      </Link>

      <div
        style={{
          marginTop: "auto",
        }}
      >
        <Link to="/" style={linkStyle}>
          <img src={homeIcon} alt="" style={iconStyle} />
          Voltar à Loja
        </Link>
      </div>
    </aside>
  );
}

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  textDecoration: "none",
  color: "white",
  padding: "14px",
  borderRadius: "14px",
  marginBottom: "10px",
  backgroundColor: "rgba(255,255,255,0.08)",
  transition: "0.2s",
};

const iconStyle = {
  width: "20px",
  height: "20px",
  filter: "brightness(0) invert(1)",
};