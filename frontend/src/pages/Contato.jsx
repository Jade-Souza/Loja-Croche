import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import phoneIcon from "../assets/icones/phone.svg";
import instagramIcon from "../assets/icones/instagram.svg";
import mailIcon from "../assets/icones/email.svg";
import clockIcon from "../assets/icones/clock.svg";
import sparklesIcon from "../assets/icones/sparkles.svg";
import arrowIcon from "../assets/icones/arrow-right.svg";

// Página de Contato
export default function Contato() {
  return (
    <>
      <Header />

      <main
        style={{
          backgroundColor: "#FAF5F0",
          minHeight: "100vh",
        }}
      >
        {/* Título */}
        <section
          style={{
            padding: "80px 60px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "#7A4E3A",
              fontSize: "60px",
              marginBottom: "20px",
            }}
          >
            Entre em Contato
          </h1>

          <p
            style={{
              color: "#5A3828",
              fontSize: "22px",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            Ficou com alguma dúvida? Deseja solicitar uma encomenda
            personalizada? Estamos à disposição para ajudar.
          </p>
        </section>

        {/* Cards de contato */}
        <section
          style={{
            padding: "0 60px 80px 60px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "30px",
            }}
          >
            {/* WhatsApp */}
            <div
              style={cardStyle}
            >
              <h2
                style={{
                  ...tituloCard,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src={phoneIcon}
                  alt=""
                  style={{
                    width: "22px",
                    height: "22px",
                  }}
                />

                WhatsApp
              </h2>

              <p style={textoCard}>
                (31) 99683-3793
              </p>

              <p style={textoPequeno}>
                Atendimento rápido para dúvidas e encomendas.
              </p>
            </div>

            {/* Instagram */}
            <div
              style={cardStyle}
            >
              <h2
                style={{
                  ...tituloCard,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src={instagramIcon}
                  alt=""
                  style={{
                    width: "22px",
                    height: "22px",
                  }}
                />

                Instagram
              </h2>

              <p style={textoCard}>
                @eliz.croche
              </p>

              <p style={textoPequeno}>
                Veja novidades, lançamentos e inspirações.
              </p>
            </div>

            {/* E-mail */}
            <div
              style={cardStyle}
            >
              <h2
                style={{
                  ...tituloCard,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src={mailIcon}
                  alt=""
                  style={{
                    width: "22px",
                    height: "22px",
                  }}
                />

                E-mail
              </h2>

              <p style={textoCard}>
                contato@elizcroche.com
              </p>

              <p style={textoPequeno}>
                Para dúvidas, sugestões e informações.
              </p>
            </div>
          </div>
        </section>

        {/* Horário */}
        <section
          style={{
            padding: "0 60px 80px 60px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "40px",
              textAlign: "center",
              border: "1px solid #E7D8D2",
              boxShadow: "0 8px 20px rgba(0,0,0,.06)",
            }}
          >
            <h2
              style={{
                color: "#7A4E3A",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src={clockIcon}
                alt=""
                style={{
                  width: "22px",
                  height: "22px",
                }}
              />

              Horário de Atendimento
            </h2>

            <p style={textoCard}>
              Segunda a Sexta
            </p>

            <p style={textoPequeno}>
              08:00 às 18:00
            </p>
          </div>
        </section>

        {/* Chamada para encomendas */}
        <section
          style={{
            padding: "0 60px 80px 60px",
          }}
        >
          <div
            style={{
              backgroundColor: "#F6DDE5",
              border: "1px solid #E7D8D2",
              borderRadius: "20px",
              padding: "50px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                color: "#7A4E3A",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src={sparklesIcon}
                alt=""
                style={{
                  width: "22px",
                  height: "22px",
                }}
              />

              Quer uma peça exclusiva?
            </h2>

            <p
              style={{
                color: "#5A3828",
                marginBottom: "30px",
                fontSize: "18px",
              }}
            >
              Solicite uma encomenda personalizada e receba
              um orçamento.
            </p>

            <Link to="/encomendas">
              <button
                style={{
                  backgroundColor: "#C97C8C",
                  color: "white",
                  border: "none",
                  padding: "18px 35px",
                  borderRadius: "12px",
                  cursor: "pointer",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",

                  margin: "0 auto",
                }}
              >
                Fazer Encomenda

                <img
                  src={arrowIcon}
                  alt=""
                  style={{
                    width: "16px",
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// Estilos reutilizados

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "20px",
  padding: "30px",
  textAlign: "center",
  border: "1px solid #E7D8D2",
  boxShadow: "0 8px 20px rgba(0,0,0,.06)",
};

const tituloCard = {
  color: "#7A4E3A",
  marginBottom: "15px",
};

const textoCard = {
  color: "#C97C8C",
  fontWeight: "bold",
  fontSize: "18px",
};

const textoPequeno = {
  color: "#666",
  marginTop: "10px",
  lineHeight: "1.6",
};