import semImagem from "../assets/produtos/sem-imagem.png";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import produtos from "../services/produtos";
import searchIcon from "../assets/icones/search.svg";
import arrowIcon from "../assets/icones/arrow-right.svg";

// Página Produtos
export default function Produtos() {

  // Texto digitado na busca
  const [busca, setBusca] = useState("");

  // Categoria selecionada
  const [categoria, setCategoria] = useState("Todos");

  // Tipo de ordenação
  const [ordenacao, setOrdenacao] = useState("");

  // Filtra os produtos
  let produtosFiltrados = produtos.filter((produto) => {

    const nomeContemBusca =
      produto.nome
        .toLowerCase()
        .includes(busca.toLowerCase());

    const categoriaValida =
      categoria === "Todos" ||
      produto.categoria === categoria;

    return nomeContemBusca && categoriaValida;
  });

  // Ordenações
  if (ordenacao === "menor-preco") {
    produtosFiltrados.sort(
      (a, b) => a.preco - b.preco
    );
  }

  if (ordenacao === "maior-preco") {
    produtosFiltrados.sort(
      (a, b) => b.preco - a.preco
    );
  }

  if (ordenacao === "az") {
    produtosFiltrados.sort(
      (a, b) => a.nome.localeCompare(b.nome)
    );
  }

  if (ordenacao === "za") {
    produtosFiltrados.sort(
      (a, b) => b.nome.localeCompare(a.nome)
    );
  }

  return (
    <>
      <Header />

      <main
        style={{
          backgroundColor: "#FAF5F0",
          minHeight: "100vh",
          padding: "50px",
        }}
      >
        {/* Título */}
        <h1
          style={{
            textAlign: "center",
            color: "#7A4E3A",
            fontSize: "48px",
            marginBottom: "40px",
          }}
        >
          Nossos Produtos
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#777",
            marginTop: "-20px",
            marginBottom: "40px",
          }}
        >
          Encontre peças artesanais feitas com carinho e exclusividade.
        </p>

        {/* Filtros */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "40px",
            justifyContent: "center",
          }}
        >
          {/* Busca */}
          <div
            style={{
              position: "relative",
            }}
          >
            <img
              src={searchIcon}
              alt="Buscar"
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "18px",
                height: "18px",
              }}
            />

            <input
              type="text"
              placeholder="Buscar produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #E7D8D2",
                  minWidth: "250px",
                  height: "48px",
                  color: "#7A4E3A",
                  fontSize: "15px",
              }}
            />
          </div>

          {/* Categoria */}
          <select
            value={categoria}
            onChange={(e) =>
              setCategoria(e.target.value)
            }
            style={{
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #E7D8D2",
              height: "48px",
              color: "#7A4E3A",
              backgroundColor: "white",
              cursor: "pointer",
          }}
          >
            <option>Todos</option>
            <option>Top</option>
            <option>Vestido</option>
            <option>Bolsa</option>
            <option>Cardigan</option>
            <option>Biquíni</option>
          </select>

          {/* Ordenação */}
          <select
            value={ordenacao}
            onChange={(e) =>
              setOrdenacao(e.target.value)
            }
            style={{
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #E7D8D2",
                height: "48px",
                color: "#7A4E3A",
                backgroundColor: "white",
                cursor: "pointer",
            }}
                      >
            <option value="">
              Ordenar por
            </option>

            <option value="menor-preco">
              Menor preço
            </option>

            <option value="maior-preco">
              Maior preço
            </option>

            <option value="az">
              A-Z
            </option>

            <option value="za">
              Z-A
            </option>
          </select>
        </div>

        {/* Quantidade de produtos */}
        <p
          style={{
            color: "#7A4E3A",
            marginBottom: "20px",
            fontWeight: "500",
          }}
        >
          {produtosFiltrados.length} produto(s) encontrado(s)
        </p>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          {produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid #E7D8D2",
                boxShadow: "0 8px 20px rgba(0,0,0,.06)",
                transition: "0.25s",
              }}
            >

            {/* Área da imagem */}
            <div
              style={{
                height: "260px",
                overflow: "hidden",
                backgroundColor: "#F6DDE5",
              }}
            >
              <img
                src={semImagem}
                alt={produto.nome}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

              {/* Conteúdo */}
              <div
                style={{
                  padding: "20px",
                }}
              >
                <p
                  style={{
                    display: "inline-block",
                    padding: "5px 12px",
                    backgroundColor: "#F8E5EB",
                    color: "#C97C8C",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "600",
                    margin: 0,
                  }}
                >
                  {produto.categoria}
                </p>

                <h3
                  style={{
                    color: "#7A4E3A",
                    marginTop: "10px",
                  }}
                >
                  {produto.nome}
                </h3>

                <p
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#C97C8C",
                    marginTop: "18px",
                    marginBottom: "20px",
                  }}
                >
                  R$ {produto.preco.toFixed(2)}
                </p>

                <Link
                  to={`/produtos/${produto.id}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <button
                    style={{
                      width: "100%",
                      marginTop: "20px",
                      backgroundColor: "#C97C8C",
                      color: "white",
                      border: "none",
                      padding: "15px",
                      borderRadius: "12px",
                      cursor: "pointer",

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Ver Produto

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
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}