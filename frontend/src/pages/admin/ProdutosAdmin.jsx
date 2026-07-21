import { useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

export default function ProdutosAdmin() {
  const [produtos, setProdutos] = useState([]);

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [imagem, setImagem] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [novoNome, setNovoNome] = useState("");
  const [novoPreco, setNovoPreco] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [novoEstoque, setNovoEstoque] = useState("");
  const [buscaProduto, setBuscaProduto] = useState("");

  useEffect(() => {
    const produtosSalvos =
      JSON.parse(
        localStorage.getItem("produtos")
      ) || [];

    setProdutos(produtosSalvos);
  }, []);

  function cadastrarProduto() {
    if (
      !nome ||
      !categoria ||
      !preco ||
      !estoque
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoProduto = {
      id: Date.now(),
      nome,
      categoria,
      descricao,
      preco: Number(preco),
      estoque: Number(estoque),
      destaque: false,
      imagem:
        imagem || "/sem-imagem.png",
    };

    const novaLista = [
      ...produtos,
      novoProduto,
    ];

    setProdutos(novaLista);

    localStorage.setItem(
      "produtos",
      JSON.stringify(novaLista)
    );

    setNome("");
    setCategoria("");
    setDescricao("");
    setPreco("");
    setEstoque("");
    setImagem("");

    alert("Produto cadastrado!");
  }

  function excluirProduto(id) {
    const confirmar =
      window.confirm(
        "Deseja excluir este produto?"
      );

    if (!confirmar) return;

    const novaLista =
      produtos.filter(
        (produto) =>
          produto.id !== id
      );

    setProdutos(novaLista);

    localStorage.setItem(
      "produtos",
      JSON.stringify(novaLista)
    );
  }

  function alterarEstoque(
    id,
    quantidade
  ) {
    const novaLista =
      produtos.map((produto) => {
        if (produto.id === id) {
          return {
            ...produto,
            estoque:
              produto.estoque +
              quantidade,
          };
        }

        return produto;
      });

    setProdutos(novaLista);

    localStorage.setItem(
      "produtos",
      JSON.stringify(novaLista)
    );
  }

  function alternarDestaque(id) {
  const novaLista = produtos.map((produto) => {
    if (produto.id === id) {
      return {
        ...produto,
        destaque: !produto.destaque,
      };
    }

    return produto;
  });

  setProdutos(novaLista);

  localStorage.setItem(
    "produtos",
    JSON.stringify(novaLista)
  );
}

  const produtosFiltrados =
    produtos.filter((produto) =>
      produto.nome
        .toLowerCase()
        .includes(
          buscaProduto.toLowerCase()
        )
    );

    function iniciarEdicao(produto) {
  setEditandoId(produto.id);

  setNovoNome(produto.nome);

  setNovoPreco(produto.preco);

  setNovaCategoria(
    produto.categoria
  );

  setNovoEstoque(
    produto.estoque
  );
}

function salvarEdicao(id) {

  const novaLista =
    produtos.map((produto) => {

      if (produto.id === id) {
        return {
          ...produto,
          nome: novoNome,
          preco: Number(novoPreco),
          categoria:
            novaCategoria,
          estoque:
            Number(novoEstoque),
        };
      }

      return produto;
    });

  setProdutos(novaLista);

  localStorage.setItem(
    "produtos",
    JSON.stringify(novaLista)
  );

  setEditandoId(null);

  alert("Produto atualizado!");
}

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#FAF5F0",
      }}
    >
      <SidebarAdmin />

      <main
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        <h1
          style={{
            color: "#7A4E3A",
            marginBottom: "30px",
          }}
        >
          Produtos
        </h1>

        {/* Cadastro */}
        <div style={card}>
          <h2>Novo Produto</h2>

          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
            style={input}
          />

          <input
            placeholder="Categoria"
            value={categoria}
            onChange={(e) =>
              setCategoria(
                e.target.value
              )
            }
            style={input}
          />

          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) =>
              setDescricao(
                e.target.value
              )
            }
            style={input}
          />

          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) =>
              setPreco(
                e.target.value
              )
            }
            style={input}
          />

          <input
            type="number"
            placeholder="Estoque"
            value={estoque}
            onChange={(e) =>
              setEstoque(
                e.target.value
              )
            }
            style={input}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
                const arquivo = e.target.files[0];

                if (!arquivo) return;

                const leitor = new FileReader();

                leitor.onloadend = () => {
                setImagem(leitor.result);
                };

                leitor.readAsDataURL(arquivo);
            }}
            style={input}
            />

          <button
            onClick={
              cadastrarProduto
            }
            style={botaoNovo}
          >
            Cadastrar Produto
          </button>
        </div>

        {/* Busca */}
        <input
          placeholder="Buscar produto..."
          value={buscaProduto}
          onChange={(e) =>
            setBuscaProduto(
              e.target.value
            )
          }
          style={busca}
        />

        {/* Lista */}
        <div style={tabela}>
          {produtosFiltrados.map(
            (produto) => (
              <div
                key={produto.id}
                style={linha}
              >
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  style={imagemStyle}
                />

                <div>

                {editandoId === produto.id ? (
                    <>
                    <input
                        value={novoNome}
                        onChange={(e) =>
                        setNovoNome(
                            e.target.value
                        )
                        }
                        style={input}
                    />

                    <input
                        value={novoPreco}
                        onChange={(e) =>
                        setNovoPreco(
                            e.target.value
                        )
                        }
                        style={input}
                    />

                    <input
                        value={novaCategoria}
                        onChange={(e) =>
                        setNovaCategoria(
                            e.target.value
                        )
                        }
                        style={input}
                    />

                    <input
                        value={novoEstoque}
                        onChange={(e) =>
                        setNovoEstoque(
                            e.target.value
                        )
                        }
                        style={input}
                    />

                    <button
                        onClick={() =>
                        salvarEdicao(
                            produto.id
                        )
                        }
                        style={botaoNovo}
                    >
                        Salvar
                    </button>
                    </>
                ) : (
                    <>
                    <h3>{produto.nome}</h3>
                    <p>{produto.categoria}</p>
                    {produto.destaque && (
                    <span
                        style={{
                        backgroundColor: "#F6DDE5",
                        color: "#7A4E3A",
                        padding: "5px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        }}
                    >
                        ⭐ Destaque
                    </span>
                    )}  

                  {produto.estoque >
                  0 ? (
                    <span
                      style={{
                        color:
                          "green",
                      }}
                    >
                      ✅ Disponível
                    </span>
                  ) : (
                    <span
                      style={{
                        color:
                          "red",
                      }}
                    >
                      ❌ Esgotado
                    </span>
                  )}
                </>
                )}
                </div>
                

                <p>
                  R$
                  {" "}
                  {produto.preco.toFixed(
                    2
                  )}
                </p>

                <p>
                  Estoque:
                  {" "}
                  {
                    produto.estoque
                  }
                </p>

                <div>
                  <button
                    style={acao}
                    onClick={() =>
                      iniciarEdicao(produto)
                    }
                  >
                ✏️
                </button>

                <button
                    style={acao}
                    onClick={() =>
                        alternarDestaque(produto.id)
                    }
                    >
                    {produto.destaque ? "⭐" : "☆"}
                    </button>
                    
                  <button
                    style={acao}
                    onClick={() =>
                      alterarEstoque(
                        produto.id,
                        1
                      )
                    }
                  >
                   +1
                  </button>

                <button
                    style={acao}
                    onClick={()=>
                        alterarEstoque(produto.id, -1)}
                >
                    -1
                </button>

                  <button
                    style={acao}
                    onClick={() =>
                      excluirProduto(
                        produto.id
                      )
                    }
                  >
                    🗑
                  </button>
                </div>
            </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}

const card = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "20px",
  marginBottom: "30px",
};

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "1px solid #ddd",
};

const busca = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  marginBottom: "20px",
};

const tabela = {
  backgroundColor: "white",
  borderRadius: "20px",
  padding: "20px",
};

const linha = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 0",
  borderBottom: "1px solid #eee",
};

const imagemStyle = {
  width: "70px",
  height: "70px",
  objectFit: "cover",
  borderRadius: "10px",
};

const acao = {
  marginLeft: "5px",
  padding: "8px",
  cursor: "pointer",
};

const botaoNovo = {
  backgroundColor: "#C97C8C",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
};