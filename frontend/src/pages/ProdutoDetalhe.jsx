import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import produtos from "../services/produtos";
import semImagem from "../assets/produtos/sem-imagem.png"
import plusIcon from "../assets/icones/plus.svg";
import minusIcon from "../assets/icones/minus.svg";
import Footer from "../components/Footer";

// Página de detalhes do produto
export default function ProdutoDetalhe() {

  // Captura o ID da URL
  const { id } = useParams();

  // Procura o produto correspondente
  const produto = produtos.find(
    (item) => item.id === Number(id)
  );

  // Cor selecionada
const [corSelecionada, setCorSelecionada] = useState(
  produto?.cores?.[0] || ""
);

// Tamanho selecionado
const [tamanhoSelecionado, setTamanhoSelecionado] = useState(
  produto?.tamanhos?.[0] || ""
);

// Quantidade selecionada
const [quantidade, setQuantidade] = useState(1);

// Adiciona produto ao carrinho
function adicionarAoCarrinho() {

  // Busca o carrinho atual
  const carrinhoAtual =
    JSON.parse(localStorage.getItem("carrinho")) || [];

  const itemExistente =
    carrinhoAtual.find(
      (item) =>
        item.id === produto.id &&
        item.cor === corSelecionada &&
        item.tamanho === tamanhoSelecionado

    );
  
  if(itemExistente){
    itemExistente.quantidade += quantidade;
  }else{
      // Novo item
      const novoItem = {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        cor: corSelecionada,
        tamanho: tamanhoSelecionado,
        quantidade: quantidade
      };
    // Adiciona ao carrinho
    carrinhoAtual.push(novoItem);  
  }

  // Salva novamente
  localStorage.setItem(
    "carrinho",
    JSON.stringify(carrinhoAtual)
  );

  // Mensagem temporária
  alert("Produto adicionado ao carrinho!");
}

  // Caso não encontre o produto
  if (!produto) {
    return (
      <>
        <Header />

        <h1
          style={{
            textAlign: "center",
            marginTop: "100px",
            color: "#7A4E3A",
          }}
        >
          Produto não encontrado
        </h1>
      </>
    );
  }

  return (
    <>
      <Header />

      <main
        style={{
          backgroundColor: "#FAF5F0",
          minHeight: "100vh",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "60px",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Área da imagem */}
          <div
            style={{
              width: "460px",
              height: "460px",
              borderRadius: "20px",
              overflow: "hidden",
              backgroundColor: "#F6DDE5",
              border: "1px solid #E7D8D2",
              boxShadow:
                "0 8px 20px rgba(0,0,0,.06)"
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

          {/* Informações do produto */}
          <div
            style={{
              maxWidth: "500px",
              padding: "10px",
            }}
          >
            {/* Categoria */}
            <p            
              style={{
                display: "inline-block",
                padding: "6px 14px",
                backgroundColor: "#F8E5EB",
                color: "#C97C8C",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "600",
                margin: 0,
              }}
            >
              {produto.categoria}
            </p>

            {/* Nome */}
            <h1
              style={{
                color: "#7A4E3A",
                fontSize: "50px",
                marginTop: "10px",
              }}
            >
              {produto.nome}
            </h1>

            {/* Preço */}
            <h2
              style={{
                color: "#C97C8C",
                fontSize: "42px",
                marginTop: "20px",
              }}
            >
              R$ {produto.preco.toFixed(2)}
            </h2>

            {/* Descrição */}
            <p
              style={{
                marginTop: "30px",
                lineHeight: "1.8",
                color: "#555",
                fontSize: "18px",
              }}
            >
              {produto.descricao}
            </p>

            {/* Cores */}
            <div
              style={{
                marginTop: "25px",
              }}
            >
              <h3
                style={{
                  color: "#7A4E3A",
                  marginBottom: "12px",
                }}
              >
                Cor
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {produto.cores.map((cor) => (
                  <button
                    key={cor}
                    onClick={() => setCorSelecionada(cor)}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "8px",
                      cursor: "pointer",

                      border:
                        corSelecionada === cor
                          ? "2px solid #C97C8C"
                          : "1px solid #ddd",

                      backgroundColor:
                        corSelecionada === cor
                          ? "#F6DDE5"
                          : "white",

                      color: "#7A4E3A",
                    }}
                  >
                    {cor}
                  </button>
                ))}
              </div>
            </div>

            {/* Tamanhos */}
            <div
              style={{
                marginTop: "25px",
              }}
            >
              <h3
                style={{
                  color: "#7A4E3A",
                  marginBottom: "12px",
                }}
              >
                Tamanho
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {produto.tamanhos.map((tamanho) => (
                  <button
                    key={tamanho}
                    onClick={() =>
                      setTamanhoSelecionado(tamanho)
                    }
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "8px",
                      cursor: "pointer",

                      border:
                        tamanhoSelecionado === tamanho
                          ? "2px solid #C97C8C"
                          : "1px solid #ddd",

                      backgroundColor:
                        tamanhoSelecionado === tamanho
                          ? "#F6DDE5"
                          : "white",

                      color: "#7A4E3A",

                      fontWeight: "bold",
                    }}
                  >
                    {tamanho}
                  </button>
                ))}
              </div>
</div>

            {/* Estoque */}
            <div
              style={{
                marginTop: "25px",
              }}
            >
              <h3
                style={{
                  color: "#7A4E3A",
                  marginBottom: "10px",
                }}
              >
                Estoque
              </h3>

              <p
                style={{
                  color: "#555",
                }}
              >
                {produto.estoque} unidades disponíveis
              </p>
            </div>

            {/* Quantidade */}
            <div
              style={{
                marginTop: "25px",
              }}
            >
              <h3
                style={{
                  color: "#7A4E3A",
                  marginBottom: "12px",
                }}
              >
                Quantidade
              </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {/* Diminuir */}
                <button
                  onClick={() =>
                    quantidade > 1 &&
                    setQuantidade(quantidade - 1)
                  }
                  style={{
                    width: "45px",
                    height: "45px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor: "white",
                    color: "#7A4E3A",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <img
                    src={minusIcon}
                    alt="Remover"
                    style={{
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </button>

                {/* Quantidade */}
                <div
                  style={{
                    width: "50px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {quantidade}
                </div>

                {/* Aumentar */}
                <button
                  onClick={() =>
                    setQuantidade(quantidade + 1)
                  }
                  style={{
                    width: "45px",
                    height: "45px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor: "white",
                    color: "#7A4E3A",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <img
                    src={plusIcon}
                    alt="Adicionar"
                    style={{
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Seleções */}
            <div
              style={{
                marginTop: "25px",
                color: "#555",
              }}
            >
              <p>
                <strong>Cor:</strong> {corSelecionada}
              </p>

              <p>
                <strong>Tamanho:</strong> {tamanhoSelecionado}
              </p>

              <p>
                <strong>Quantidade:</strong> {quantidade}
              </p>

                <p
                  style={{
                    fontSize: "22px",
                    color: "#C97C8C",
                    fontWeight: "700",
                    marginTop: "18px",
                  }}
                >
                  Total: R$ {(produto.preco * quantidade).toFixed(2)}
                </p>
            </div>

            {/* Botão */}
            <button
              onClick={adicionarAoCarrinho}
              style={{
                marginTop: "35px",
                backgroundColor: "#C97C8C",
                color: "white",
                border: "none",
                padding: "18px 35px",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "18px",
                width: "100%",
              }}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}