// Importa useState
import { useState } from "react";

// Importa Link
import { Link } from "react-router-dom";

// Importa logo
import logo from "../assets/imagens/logo.png";

// Componente Header
export default function Header() {

  // Controla abertura do menu
  const [menuAberto, setMenuAberto] = useState(false);

  // Busca carrinho salvo
  const carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];
  
  const totalItens = carrinho.reduce(
  (total, item) => total + item.quantidade,
  0);

  return (
    <>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#FAF5F0",
          borderBottom: "1px solid #E7D8D2",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 30px",
            position: "relative",
          }}
        >
          {/* Menu Hamburguer */}
          <button
            onClick={() => setMenuAberto(true)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "32px",
              cursor: "pointer",
              color: "#C97C8C",
            }}
          >
            ☰
          </button>

          {/* Logo */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Link to="/">
              <img
                src={logo}
                alt="Eliz Crochê"
                style={{
                  height: "55px",
                  objectFit: "contain",
                }}
              />
            </Link>
          </div>

          {/* Área direita */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
            }}
          >
            {/* Busca */}
            <button
              style={{
                border: "none",
                background: "transparent",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              🔍
            </button>

            {/* Conta */}
            <Link
              to="/admin/login"
              style={{
                textDecoration: "none",
                color: "#7A4E3A",
                fontWeight: "500",
              }}
            >
              Minha Conta
            </Link>

            {/* Carrinho */}
            <Link
              to="/carrinho"
              style={{
                textDecoration: "none",
                fontSize: "24px",
                color: "#7A4E3A",
              }}
            >
              🛒 {totalItens}
            </Link>
          </div>
        </div>
      </header>

      {/* Fundo escuro */}
      {menuAberto && (
        <div
          onClick={() => setMenuAberto(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 999,
          }}
        />
      )}

      {/* Menu lateral */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: menuAberto ? "0" : "-320px",
          width: "300px",
          height: "100vh",
          backgroundColor: "white",
          transition: "0.3s",
          zIndex: 1000,
          padding: "30px",
          boxShadow: "3px 0 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Fechar */}
        <button
          onClick={() => setMenuAberto(false)}
          style={{
            border: "none",
            background: "transparent",
            fontSize: "28px",
            cursor: "pointer",
            color: "#C97C8C",
            marginBottom: "30px",
          }}
        >
          ✕
        </button>

        {/* Links */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          <Link style={linkMenu} to="/">
            Início
          </Link>

          <Link style={linkMenu} to="/produtos">
            Produtos
          </Link>

          <Link style={linkMenu} to="/encomendas">
            Encomendas
          </Link>

          <Link style={linkMenu} to="/sobre">
            Sobre
          </Link>

          <Link style={linkMenu} to="/contato">
            Contato
          </Link>

          <hr />

          <Link style={linkMenu} to="/carrinho">
            🛒 Carrinho ({totalItens})
          </Link>
        </nav>
      </div>
    </>
  );
}

// Estilo dos links do menu
const linkMenu = {
  textDecoration: "none",
  color: "#7A4E3A",
  fontSize: "18px",
  fontWeight: "500",
};