import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import banner from "../assets/imagens/banner-home.png";

import truck from "../assets/icones/truck.svg";
import yarn from "../assets/icones/yarn.svg";
import gem from "../assets/icones/gem.svg";
import headset from "../assets/icones/headset.svg";

import { Link } from "react-router-dom";

// Página inicial
export default function Home() {
  const [destaques, setDestaques] = useState([]);

  useEffect(() => {
    const produtos =
      JSON.parse(localStorage.getItem("produtos")) || [];

    const produtosDestaque =
      produtos.filter((produto) => produto.destaque);

    setDestaques(produtosDestaque);
  }, []);

  return (
    <>
      <Header />

      {/* Banner */}
      <section
        style={{
          width: "100%",
          height: "600px",
          overflow: "hidden",
        }}
      >
        <img
          src={banner}
          alt="Crochê Artesanal"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </section>

      {/* Benefícios */}
      <section
        style={{
          background: "#fff",
          padding: "40px 20px",
          boxShadow: "0 2px 10px rgba(0,0,0,.05)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <img
              src={truck}
              alt=""
              style={{
                width: "38px",
              }}
            />

            <div>
              <strong
                style={{
                  color: "#7A4E3A",
                }}
              >
                Entrega
              </strong>

              <p
                style={{
                  margin: 0,
                  color: "#666",
                }}
              >
                Para todo o Brasil
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <img
              src={yarn}
              alt=""
              style={{
                width: "38px",
              }}
            />

            <div>
              <strong
                style={{
                  color: "#7A4E3A",
                }}
              >
                Artesanal
              </strong>

              <p
                style={{
                  margin: 0,
                  color: "#666",
                }}
              >
                Feito à mão
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <img
              src={gem}
              alt=""
              style={{
                width: "38px",
              }}
            />

            <div>
              <strong
                style={{
                  color: "#7A4E3A",
                }}
              >
                Exclusividade
              </strong>

              <p
                style={{
                  margin: 0,
                  color: "#666",
                }}
              >
                Peças únicas
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <img
              src={headset}
              alt=""
              style={{
                width: "38px",
              }}
            />

            <div>
              <strong
                style={{
                  color: "#7A4E3A",
                }}
              >
                Atendimento
              </strong>

              <p
                style={{
                  margin: 0,
                  color: "#666",
                }}
              >
                Personalizado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Encomendas */}
      <section
        style={{
          background: "#fff",
          padding: "90px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#7A4E3A",
            fontSize: "44px",
            marginBottom: "25px",
          }}
        >
          Não encontrou o que procura?
        </h2>

        <p
          style={{
            maxWidth: "750px",
            margin: "0 auto",
            color: "#666",
            fontSize: "20px",
            lineHeight: "1.7",
          }}
        >
          Produzimos peças exclusivas sob encomenda.
          Envie uma foto de referência e criaremos uma peça
          feita especialmente para você.
        </p>

        <Link to="/encomendas">
          <button
            style={{
              marginTop: "35px",
              background: "#C97C8C",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "18px 40px",
              cursor: "pointer",
              fontSize: "17px",
            }}
          >
            Fazer Encomenda
          </button>
        </Link>
      </section>

      {/* Produtos em Destaque */}
      <section
        style={{
          backgroundColor: "#FAF5F0",
          padding: "90px 60px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#7A4E3A",
            fontSize: "42px",
            marginBottom: "15px",
          }}
        >
          Produtos em Destaque
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "55px",
            fontSize: "18px",
          }}
        >
          Algumas das peças favoritas das nossas clientes.
        </p>

        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px,1fr))",
            gap: "35px",
          }}
        >
          {destaques.length > 0 ? (
            destaques.map((produto) => (
              <div
                key={produto.id}
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  overflow: "hidden",
                  transition: ".3s",
                  boxShadow: "0 8px 25px rgba(0,0,0,.08)",
                }}
              >
                <div
                  style={{
                    height: "360px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: ".4s",
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: "25px",
                  }}
                >
                  <h3
                    style={{
                      color: "#7A4E3A",
                      marginBottom: "10px",
                      fontSize: "23px",
                    }}
                  >
                    {produto.nome}
                  </h3>

                  <p
                    style={{
                      color: "#888",
                      fontSize: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    {produto.categoria}
                  </p>

                  <p
                    style={{
                      color: "#C97C8C",
                      fontWeight: "bold",
                      fontSize: "24px",
                      marginBottom: "25px",
                    }}
                  >
                    R$ {produto.preco.toFixed(2)}
                  </p>

                  <button
                    style={{
                      width: "100%",
                      padding: "15px",
                      background: "#7A4E3A",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    Ver Produto
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p
              style={{
                textAlign: "center",
                gridColumn: "1/-1",
              }}
            >
              Nenhum produto em destaque.
            </p>
          )}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "60px",
          }}
        >
          <Link to="/produtos">
            <button
              style={{
                background: "#C97C8C",
                color: "#fff",
                border: "none",
                padding: "18px 40px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "17px",
              }}
            >
              Ver Todos os Produtos
            </button>
          </Link>
        </div>
      </section>

      <Footer />
          </>
        );
      }