import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/imagens/logo.png";
import menuIcon from "../assets/icones/menu.svg";
import searchIcon from "../assets/icones/search.svg";
import shoppingBagIcon from "../assets/icones/shopping-bag.svg";
import xIcon from "../assets/icones/x.svg";

export default function Header() {
  const navigate = useNavigate();

  // Controla abertura do menu
  const [menuAberto, setMenuAberto] = useState(false);

  // Estado do cliente logado
  const [cliente, setCliente] = useState(null);

  // Verifica se existe cliente logado ao carregar
  useEffect(() => {
    const clienteSalvo = JSON.parse(localStorage.getItem("clienteLogado"));
    if (clienteSalvo) {
      setCliente(clienteSalvo);
    }
  }, []);

  // Busca carrinho salvo
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  // Função para deslogar o cliente
  function handleLogout() {
    localStorage.removeItem("clienteLogado");
    setCliente(null);
    navigate("/login");
  }

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
              width: "42px",
              height: "42px",
              border: "none",
              borderRadius: "50%",
              background: "#F8E8EB",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: ".3s",
            }}
          >
            <img
              src={menuIcon}
              alt="Menu"
              style={{
                width: "30px",
                height: "30px",
              }}
            />
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
              gap: "20px",
            }}
          >
            {/* Busca */}
            <button
              style={{
                width: "42px",
                height: "42px",
                border: "none",
                borderRadius: "50%",
                background: "#F8E8EB",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: ".3s",
              }}
            >
              <img
                src={searchIcon}
                alt="Pesquisar"
                style={{
                  width: "22px",
                  height: "22px",
                }}
              />
            </button>

            {/* Conta do Cliente */}
            {cliente ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    color: "#7A4E3A",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Olá, {cliente.nome.split(" ")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#d9534f",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  (Sair)
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#7A4E3A",
                  fontWeight: "500",
                }}
              >
                Minha Conta
              </Link>
            )}

            {/* Carrinho */}
            <Link
              to="/carrinho"
              style={{
                textDecoration: "none",
                color: "#7A4E3A",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  border: "none",
                  borderRadius: "50%",
                  background: "#F8E8EB",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: ".3s",
                  position: "relative",
                }}
              >
                <img
                  src={shoppingBagIcon}
                  alt="Carrinho"
                  style={{
                    width: "22px",
                    height: "22px",
                  }}
                />
                {totalItens > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-2px",
                      right: "-2px",
                      backgroundColor: "#C97C8C",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: "bold",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {totalItens}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Fundo escuro do menu */}
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* Fechar */}
          <button
            onClick={() => setMenuAberto(false)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#C97C8C",
              marginBottom: "30px",
            }}
          >
            <img
              src={xIcon}
              alt="Fechar"
              style={{
                width: "24px",
                height: "24px",
              }}
            />
          </button>

          {/* Links Principais */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            }}
          >
            <Link
              style={linkMenu}
              to="/"
              onClick={() => setMenuAberto(false)}
            >
              Início
            </Link>

            <Link
              style={linkMenu}
              to="/produtos"
              onClick={() => setMenuAberto(false)}
            >
              Produtos
            </Link>

            <Link
              style={linkMenu}
              to="/encomendas"
              onClick={() => setMenuAberto(false)}
            >
              Encomendas
            </Link>

            <Link
              style={linkMenu}
              to="/sobre"
              onClick={() => setMenuAberto(false)}
            >
              Sobre
            </Link>

            <Link
              style={linkMenu}
              to="/contato"
              onClick={() => setMenuAberto(false)}
            >
              Contato
            </Link>

            <hr style={{ border: "none", borderTop: "1px solid #E7D8D2" }} />

            <Link
              style={linkMenu}
              to="/carrinho"
              onClick={() => setMenuAberto(false)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src={shoppingBagIcon}
                  alt="Carrinho"
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                />
                <span>Carrinho ({totalItens})</span>
              </div>
            </Link>
          </nav>
        </div>

        {/* Rodapé do Menu Hamburguer (Link Discreto do Admin para a Dona) */}
        <div style={{ paddingTop: "20px", borderTop: "1px solid #eee" }}>
          <Link
            to="/admin/login"
            onClick={() => setMenuAberto(false)}
            style={{
              textDecoration: "none",
              color: "#aaa",
              fontSize: "13px",
              fontWeight: "500",
            }}
          >
            Acesso Administrativo
          </Link>
        </div>
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