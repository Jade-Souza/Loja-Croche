// Importa o Header
import Header from "../components/Header";

// Importa o Footer
import Footer from "../components/Footer";

// Importa Link
import { Link } from "react-router-dom";

// Página Sobre
export default function Sobre() {
  return (
    <>
      <Header />

      <main
        style={{
          backgroundColor: "#FAF5F0",
          minHeight: "100vh",
        }}
      >
        {/* Hero */}
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
            Sobre a Eliz Crochê
          </h1>

          <p
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              color: "#5A3828",
              fontSize: "22px",
              lineHeight: "1.8",
            }}
          >
            A Eliz Crochê nasceu da paixão pelo artesanato e pelo desejo
            de transformar fios em peças únicas. Cada criação é feita à mão,
            com atenção aos detalhes, carinho e dedicação, para que cada
            cliente receba algo especial e exclusivo.
          </p>
        </section>

        {/* História */}
        <section
          style={{
            padding: "20px 60px 80px 60px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "40px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                color: "#7A4E3A",
                marginBottom: "20px",
              }}
            >
              Nossa História
            </h2>

            <p
              style={{
                color: "#555",
                lineHeight: "1.9",
                fontSize: "18px",
              }}
            >
              Tudo começou com o amor pelo crochê e pela arte de criar
              peças artesanais. O que era apenas um hobby se transformou
              em uma forma de levar beleza, conforto e personalidade para
              outras pessoas.

              <br /><br />

              Hoje, cada peça produzida pela Eliz Crochê carrega a mesma
              dedicação do primeiro trabalho realizado. Valorizamos a
              qualidade, a criatividade e a exclusividade em cada detalhe.
            </p>
          </div>
        </section>

        {/* Valores */}
        <section
          style={{
            padding: "0 60px 80px 60px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#7A4E3A",
              fontSize: "42px",
              marginBottom: "40px",
            }}
          >
            Nossos Valores
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "30px",
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h3
                style={{
                  color: "#7A4E3A",
                  marginBottom: "15px",
                }}
              >
                🧶 Artesanal
              </h3>

              <p
                style={{
                  color: "#555",
                  lineHeight: "1.7",
                }}
              >
                Cada peça é confeccionada manualmente,
                valorizando os detalhes e a exclusividade.
              </p>
            </div>

            {/* Card 2 */}
            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h3
                style={{
                  color: "#7A4E3A",
                  marginBottom: "15px",
                }}
              >
                ❤️ Feito com Carinho
              </h3>

              <p
                style={{
                  color: "#555",
                  lineHeight: "1.7",
                }}
              >
                Produção cuidadosa para garantir qualidade
                e beleza em cada criação.
              </p>
            </div>

            {/* Card 3 */}
            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h3
                style={{
                  color: "#7A4E3A",
                  marginBottom: "15px",
                }}
              >
                ✨ Exclusividade
              </h3>

              <p
                style={{
                  color: "#555",
                  lineHeight: "1.7",
                }}
              >
                Produzimos peças únicas e também
                encomendas personalizadas.
              </p>
            </div>
          </div>
        </section>

        {/* Chamada para ação */}
        <section
          style={{
            padding: "0 60px 80px 60px",
          }}
        >
          <div
            style={{
              backgroundColor: "#F6DDE5",
              borderRadius: "20px",
              padding: "50px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                color: "#7A4E3A",
                marginBottom: "20px",
              }}
            >
              Gostaria de uma peça exclusiva?
            </h2>

            <p
              style={{
                color: "#5A3828",
                marginBottom: "30px",
                fontSize: "18px",
              }}
            >
              Entre em contato e solicite uma encomenda personalizada.
            </p>

            <Link to="/encomendas">
              <button
                style={{
                  backgroundColor: "#C97C8C",
                  color: "white",
                  border: "none",
                  padding: "18px 35px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                Fazer Encomenda
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}