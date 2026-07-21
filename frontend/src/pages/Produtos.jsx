import semImagem from "../assets/produtos/sem-imagem.png";

// Importa useState
import { useState } from "react";

// Importa Header
import Header from "../components/Header";

// Importa Footer
import Footer from "../components/Footer";

// Importa Link
import { Link } from "react-router-dom";

// Importa lista de produtos
import produtos from "../services/produtos";

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
          <input
            type="text"
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) =>
              setBusca(e.target.value)
            }
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #DDD",
              minWidth: "250px",
            }}
          />

          {/* Categoria */}
          <select
            value={categoria}
            onChange={(e) =>
              setCategoria(e.target.value)
            }
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #DDD",
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
              borderRadius: "10px",
              border: "1px solid #DDD",
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
                boxShadow:
                  "0 5px 15px rgba(0,0,0,0.08)",
                transition: "0.3s",
              }}
            >

            {/* Área da imagem */}
            <div
              style={{
                height: "300px",
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
                    color: "#C97C8C",
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
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#C97C8C",
                    marginTop: "15px",
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
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Ver Produto
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