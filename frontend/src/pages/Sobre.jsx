import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import yarnIcon from "../assets/icones/yarn.svg";
import handMadeIcon from "../assets/icones/scissors.svg";
import heartIcon from "../assets/icones/heart.svg";
import sparklesIcon from "../assets/icones/sparkles.svg";
import arrowIcon from "../assets/icones/arrow-right.svg";

// Página Sobre
export default function Sobre() {
  return (
    <>
      <Header />

      <main
        style={{
          backgroundColor: "#FAF5F0",
          minHeight: "170px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
              maxWidth: "1100px",
              margin: "0 auto",
              color: "#5A3828",
              fontSize: "22px",
              lineHeight: "2",
              backgroundColor: "transparent",
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
              border: "1px solid #E7D8D2",
              boxShadow: "0 8px 20px rgba(0,0,0,.06)",
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
                color: "#5A3828",
                lineHeight: "1.7",
                fontSize: "28px",
                fontWeight: "600",
                marginBottom: "25px",
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
                border: "1px solid #E7D8D2",
                boxShadow: "0 8px 20px rgba(0,0,0,.06)",
              }}
            >
              <h3
                style={{
                  color: "#7A4E3A",
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src={handMadeIcon}
                  alt=""
                  style={{
                    width: "26px",
                    height: "26px",
                  }}
                />

                Artesanal
              </h3>

              <p
                style={{
                  color: "#555",
                  lineHeight: "2",
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
                border: "1px solid #E7D8D2",
                boxShadow: "0 8px 20px rgba(0,0,0,.06)",
              }}
            >
              <h3
                style={{
                  color: "#7A4E3A",
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src={heartIcon}
                  alt=""
                  style={{
                    width: "26px",
                    height: "26px",
                  }}
                />

                Feito com Carinho
              </h3>   

              <p
                style={{
                  color: "#555",
                  lineHeight: "2",
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
                border: "1px solid #E7D8D2",
                boxShadow: "0 8px 20px rgba(0,0,0,.06)",
              }}
            >
              <h3
                style={{
                  color: "#7A4E3A",
                  marginBottom: "15px",
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
                    width: "26px",
                    height: "26px",
                  }}
                />

                Exclusividade
              </h3>

              <p
                style={{
                  color: "#555",
                  lineHeight: "2",
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
                  padding: "18px 42px",
                  fontSize: "17px",
                  fontWeight: "600",
                  borderRadius: "12px",
                  cursor: "pointer",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
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