import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import plusIcon from "../assets/icones/plus.svg";
import checkIcon from "../assets/icones/check.svg";
import pencilIcon from "../assets/icones/pencil.svg";
import trashIcon from "../assets/icones/trash-2.svg";
import packageIcon from "../assets/icones/package.svg";
import shoppingBagIcon from "../assets/icones/shopping-bag.svg";

export default function Admin() {
  const [produtos, setProdutos] = useState([]);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");

  const [editandoId, setEditandoId] = useState(null);

  const [novoNome, setNovoNome] = useState("");
  const [novoPreco, setNovoPreco] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");

  useEffect(() => {
    const produtosSalvos =
      JSON.parse(
        localStorage.getItem("produtosAdmin")
      ) || [];

    setProdutos(produtosSalvos);
  }, []);

  function cadastrarProduto() {
    if (!nome || !preco || !categoria) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoProduto = {
      id: Date.now(),
      nome,
      preco: Number(preco),
      categoria,
      imagem: "/sem-imagem.png",
    };

    const novaLista = [
      ...produtos,
      novoProduto,
    ];

    setProdutos(novaLista);

    localStorage.setItem(
      "produtosAdmin",
      JSON.stringify(novaLista)
    );

    setNome("");
    setPreco("");
    setCategoria("");

    alert("Produto cadastrado!");
  }

  function removerProduto(id) {
    const confirmar = window.confirm(
      "Deseja remover este produto?"
    );

    if (!confirmar) return;

    const novaLista = produtos.filter(
      (produto) => produto.id !== id
    );

    setProdutos(novaLista);

    localStorage.setItem(
      "produtosAdmin",
      JSON.stringify(novaLista)
    );
  }

  function iniciarEdicao(produto) {
  setEditandoId(produto.id);

  setNovoNome(produto.nome);
  setNovoPreco(produto.preco);
  setNovaCategoria(produto.categoria);
}

function salvarEdicao(id) {

  const novaLista = produtos.map((produto) => {

    if (produto.id === id) {
      return {
        ...produto,
        nome: novoNome,
        preco: Number(novoPreco),
        categoria: novaCategoria
      };
    }

    return produto;
  });

  setProdutos(novaLista);

  localStorage.setItem(
    "produtosAdmin",
    JSON.stringify(novaLista)
  );

  setEditandoId(null);

  alert("Produto atualizado!");
}

  const itensCarrinho = (
    JSON.parse(
      localStorage.getItem("carrinho")
    ) || []
  ).length;

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
        <h1
          style={{
            color: "#7A4E3A",
            marginBottom: "30px",
          }}
        >
          Painel Administrativo
        </h1>

        {/* Estatísticas */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div style={cardStyle}>
            <img
              src={packageIcon}
              alt=""
              style={{
                width: "34px",
                marginBottom: "10px",
              }}
            />

            <h3>Total de Produtos</h3>

            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "#C97C8C",
                marginTop: "10px",
              }}
            >
              {produtos.length}
            </p>
          </div>

          <div style={cardStyle}>
            <h3>Itens no Carrinho</h3>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              {itensCarrinho}
            </p>
          </div>
        </div>

        {/* Cadastro */}
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "20px",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              color: "#7A4E3A",
              marginBottom: "20px",
            }}
          >
            Cadastrar Produto
          </h2>

          <input
            type="text"
            placeholder="Nome do Produto"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) =>
              setPreco(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={(e) =>
              setCategoria(e.target.value)
            }
            style={inputStyle}
          />

          <button
            onClick={cadastrarProduto}
            style={{
              ...botaoStyle,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img
              src={plusIcon}
              alt=""
              style={{
                width: "18px",
                height: "18px",
              }}
            />

            Salvar Produto
          </button>
        </div>

        {/* Lista */}
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "20px",
          }}
        >
          <h2
            style={{
              color: "#7A4E3A",
              marginBottom: "20px",
            }}
          >
            Produtos Cadastrados
          </h2>

          {produtos.length === 0 ? (
            <p>
              Nenhum produto cadastrado.
            </p>
          ) : (
            produtos.map((produto) => (
              <div
                key={produto.id}
                style={{
                  borderBottom: "1px solid #eee",
                  padding: "20px 0",
                }}
              >
                {editandoId === produto.id ? (
                  <>
                    <input
                      value={novoNome}
                      onChange={(e) =>
                        setNovoNome(e.target.value)
                      }
                      style={inputStyle}
                    />

                    <input
                      value={novoPreco}
                      onChange={(e) =>
                        setNovoPreco(e.target.value)
                      }
                      style={inputStyle}
                    />

                    <input
                      value={novaCategoria}
                      onChange={(e) =>
                        setNovaCategoria(e.target.value)
                      }
                      style={inputStyle}
                    />

                    <button
                      onClick={() => salvarEdicao(produto.id)}
                      style={{
                        ...botaoStyle,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <img
                        src={checkIcon}
                        alt=""
                        style={{
                          width: "18px",
                          height: "18px",
                        }}
                      />

                      Salvar Alterações
                    </button>
                  </>
                ) : (
                  <>
                    <h3>{produto.nome}</h3>

                    <p>
                      Categoria: {produto.categoria}
                    </p>

                    <p>
                      R$ {produto.preco.toFixed(2)}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <button
                        onClick={() => iniciarEdicao(produto)}
                        style={{
                          backgroundColor: "#5cb85c",
                          color: "white",
                          border: "none",
                          padding: "10px 15px",
                          borderRadius: "8px",
                          cursor: "pointer",

                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <img
                          src={pencilIcon}
                          alt=""
                          style={{
                            width: "18px",
                            height: "18px",
                            filter: "brightness(0) invert(1)",
                          }}
                        />

                        Editar
                      </button>

                      <button
                        onClick={() => removerProduto(produto.id)}
                        style={botaoExcluir}
                      >
                        <img
                          src={trashIcon}
                          alt=""
                          style={{
                            width: "17px",
                            filter: "brightness(0) invert(1)",
                          }}
                        />

                        Remover
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
            </div>
          </main>
      <Footer />
    </>
  );
}

const cardStyle = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "18px",
  minWidth: "220px",
  border: "1px solid #E7D8D2",
  boxShadow: "0 6px 18px rgba(0,0,0,.05)",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ddd",
};

const botaoStyle = {
  backgroundColor: "#C97C8C",
  color: "white",
  border: "none",
  padding: "15px 20px",
  borderRadius: "10px",
  cursor: "pointer",
};

const botaoEditar = {
  backgroundColor: "#C97C8C",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "10px",
  cursor: "pointer",

  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const botaoExcluir = {
  backgroundColor: "#7A4E3A",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "10px",
  cursor: "pointer",

  display: "flex",
  alignItems: "center",
  gap: "8px",
};