import { Link } from "react-router-dom";
import instagramIcon from "../assets/icones/instagram.svg";
import whatsappIcon from "../assets/icones/brand-whatsapp.svg";
import tiktokIcon from "../assets/icones/Tiktok.svg";

// Componente Footer
export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "##F7F1EB",
        color: "#7A4E3A",
        padding: "40px 60px",
        borderTop: "1px solid #E7D8D2",
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
              color: "#7A4E3A",
              letterSpacing: "1px"
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
              marginBottom: "15px",
              color: "#7A4E3A",
              letterSpacing: "1px"
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
          <h3>Siga-nos</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <a
              href="https://www.instagram.com/elizangelar.souza?igsh=MTlsbTFtbW8yMGI3cg=="
              style={{
                ...linkStyle,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src={instagramIcon}
                alt="Instagram"
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />

              Instagram
            </a>

            <a
              href="5531996833793"
              style={{
                ...linkStyle,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src={whatsappIcon}
                alt="WhatsApp"
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />

              WhatsApp
            </a>

            <a
              href="https://www.tiktok.com/@eliz.croche?_r=1&_t=ZS-98DwmpwMj7Q"
              style={{
                ...linkStyle,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src={tiktokIcon}
                alt="TikTok"
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />

              TikTok
            </a>
          </div>
        </div>
      </div>

      {/* Linha */}
      <hr
        style={{
          marginTop: "40px",
          marginBottom: "20px",
          border: "1px solid #E7D8D2",
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
  color: "#7A4E3A",
  textDecoration: "none",
  transition: "0.3s",
};