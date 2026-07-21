// Importa Link para navegação
import { Link } from "react-router-dom";

// Componente Footer
export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#7A4E3A",
        color: "white",
        padding: "50px 60px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        {/* Marca */}
        <div>
          <h2
            style={{
              marginBottom: "15px",
            }}
          >
            Eliz Crochê
          </h2>

          <p
            style={{
              maxWidth: "300px",
              lineHeight: "1.6",
            }}
          >
            Peças artesanais feitas à mão com carinho,
            qualidade e exclusividade.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h3>Links</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <Link style={linkStyle} to="/">
              Início
            </Link>

            <Link style={linkStyle} to="/produtos">
              Produtos
            </Link>

            <Link style={linkStyle} to="/encomendas">
              Encomendas
            </Link>

            <Link style={linkStyle} to="/contato">
              Contato
            </Link>
          </div>
        </div>

        {/* Redes */}
        <div>
          <h3>Redes Sociais</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <a
              href="#"
              style={linkStyle}
            >
              Instagram
            </a>

            <a
              href="#"
              style={linkStyle}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Linha */}
      <hr
        style={{
          marginTop: "40px",
          marginBottom: "20px",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      />

      {/* Copyright */}
      <p
        style={{
          textAlign: "center",
        }}
      >
        © 2026 Eliz Crochê - Todos os direitos reservados
      </p>
    </footer>
  );
}

// Estilo dos links
const linkStyle = {
  color: "white",
  textDecoration: "none",
};