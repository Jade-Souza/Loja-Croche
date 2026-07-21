import { useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

// Importação dos ícones SVG
import pencilIcon from "../../assets/icones/pencil.svg";
import starIcon from "../../assets/icones/star.svg";
import plusIcon from "../../assets/icones/plus.svg";
import minusIcon from "../../assets/icones/minus.svg";
import trashIcon from "../../assets/icones/trash-2.svg";
import checkIcon from "../../assets/icones/check.svg";
import xIcon from "../../assets/icones/x.svg";

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
      JSON.parse(localStorage.getItem("produtos")) || [];

    setProdutos(produtosSalvos);
  }, []);

  function cadastrarProduto() {
    if (!nome || !categoria || !preco || !estoque) {
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
      imagem: imagem || "/sem-imagem.png",
    };

    const novaLista = [...produtos, novoProduto];

    setProdutos(novaLista);
    localStorage.setItem("produtos", JSON.stringify(novaLista));

    setNome("");
    setCategoria("");
    setDescricao("");
    setPreco("");
    setEstoque("");
    setImagem("");

    alert("Produto cadastrado!");
  }

  function excluirProduto(id) {
    const confirmar = window.confirm("Deseja excluir este produto?");

    if (!confirmar) return;

    const novaLista = produtos.filter((produto) => produto.id !== id);

    setProdutos(novaLista);
    localStorage.setItem("produtos", JSON.stringify(novaLista));
  }

  function alterarEstoque(id, quantidade) {
    const novaLista = produtos.map((produto) => {
      if (produto.id === id) {
        return {
          ...produto,
          estoque: Math.max(0, produto.estoque + quantidade),
        };
      }
      return produto;
    });

    setProdutos(novaLista);
    localStorage.setItem("produtos", JSON.stringify(novaLista));
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
    localStorage.setItem("produtos", JSON.stringify(novaLista));
  }

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(buscaProduto.toLowerCase())
  );

  function iniciarEdicao(produto) {
    setEditandoId(produto.id);
    setNovoNome(produto.nome);
    setNovoPreco(produto.preco);
    setNovaCategoria(produto.categoria);
    setNovoEstoque(produto.estoque);
  }

  function salvarEdicao(id) {
    const novaLista = produtos.map((produto) => {
      if (produto.id === id) {
        return {
          ...produto,
          nome: novoNome,
          preco: Number(novoPreco),
          categoria: novaCategoria,
          estoque: Number(novoEstoque),
        };
      }
      return produto;
    });

    setProdutos(novaLista);
    localStorage.setItem("produtos", JSON.stringify(novaLista));
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
          <h2 style={{ marginBottom: "15px" }}>Novo Produto</h2>

          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={input}
          />

          <input
            placeholder="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={input}
          />

          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={input}
          />

          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            style={input}
          />

          <input
            type="number"
            placeholder="Estoque"
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
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

          <button onClick={cadastrarProduto} style={botaoNovo}>
            <img src={plusIcon} alt="Adicionar" style={iconeBotaoBranco} />
            Cadastrar Produto
          </button>
        </div>

        {/* Busca */}
        <input
          placeholder="Buscar produto..."
          value={buscaProduto}
          onChange={(e) => setBuscaProduto(e.target.value)}
          style={busca}
        />

        {/* Lista */}
        <div style={tabela}>
          {produtosFiltrados.map((produto) => (
            <div key={produto.id} style={linha}>
              <img
                src={produto.imagem}
                alt={produto.nome}
                style={imagemStyle}
              />

              <div style={{ flex: 1, marginLeft: "15px" }}>
                {editandoId === produto.id ? (
                  <>
                    <input
                      value={novoNome}
                      onChange={(e) => setNovoNome(e.target.value)}
                      style={input}
                    />

                    <input
                      value={novoPreco}
                      onChange={(e) => setNovoPreco(e.target.value)}
                      style={input}
                    />

                    <input
                      value={novaCategoria}
                      onChange={(e) => setNovaCategoria(e.target.value)}
                      style={input}
                    />

                    <input
                      value={novoEstoque}
                      onChange={(e) => setNovoEstoque(e.target.value)}
                      style={input}
                    />

                    <button
                      onClick={() => salvarEdicao(produto.id)}
                      style={botaoNovo}
                    >
                      Salvar
                    </button>
                  </>
                ) : (
                  <>
                    <h3 style={{ margin: "0 0 5px 0" }}>{produto.nome}</h3>
                    <p style={{ margin: "0 0 8px 0", color: "#666" }}>
                      {produto.categoria}
                    </p>

                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      {produto.destaque && (
                        <span
                          style={{
                            backgroundColor: "#F6DDE5",
                            color: "#7A4E3A",
                            padding: "4px 10px",
                            borderRadius: "999px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <img src={starIcon} alt="Destaque" style={iconePequeno} />
                          Destaque
                        </span>
                      )}

                      {produto.estoque > 0 ? (
                        <span
                          style={{
                            color: "green",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "13px",
                            fontWeight: "bold",
                          }}
                        >
                          <img src={checkIcon} alt="Disponível" style={iconeStatusVerde} />
                          Disponível
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "red",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "13px",
                            fontWeight: "bold",
                          }}
                        >
                          <img src={xIcon} alt="Esgotado" style={iconeStatusVermelho} />
                          Esgotado
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              <p style={{ fontWeight: "bold", width: "100px", textAlign: "right" }}>
                R$ {produto.preco.toFixed(2)}
              </p>

              <p style={{ width: "100px", textAlign: "center" }}>
                Estoque: {produto.estoque}
              </p>

              <div style={{ display: "flex", gap: "5px" }}>
                <button
                  style={acao}
                  title="Editar"
                  onClick={() => iniciarEdicao(produto)}
                >
                  <img src={pencilIcon} alt="Editar" style={iconeAcao} />
                </button>

                <button
                  style={{
                    ...acao,
                    backgroundColor: produto.destaque ? "#FFF0F5" : "#f5f5f5",
                  }}
                  title="Destaque"
                  onClick={() => alternarDestaque(produto.id)}
                >
                  <img
                    src={starIcon}
                    alt="Destaque"
                    style={{
                      ...iconeAcao,
                      opacity: produto.destaque ? 1 : 0.4,
                    }}
                  />
                </button>

                <button
                  style={acao}
                  title="Aumentar Estoque"
                  onClick={() => alterarEstoque(produto.id, 1)}
                >
                  <img src={plusIcon} alt="+1" style={iconeAcao} />
                </button>

                <button
                  style={acao}
                  title="Diminuir Estoque"
                  onClick={() => alterarEstoque(produto.id, -1)}
                >
                  <img src={minusIcon} alt="-1" style={iconeAcao} />
                </button>

                <button
                  style={{ ...acao, backgroundColor: "#FFEEEB" }}
                  title="Excluir"
                  onClick={() => excluirProduto(produto.id)}
                >
                  <img src={trashIcon} alt="Excluir" style={iconeAcao} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Estilos
const card = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "20px",
  marginBottom: "30px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "5px",
  marginBottom: "12px",
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
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
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
  padding: "8px",
  cursor: "pointer",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconeAcao = {
  width: "16px",
  height: "16px",
};

const iconePequeno = {
  width: "12px",
  height: "12px",
};

const iconeBotaoBranco = {
  width: "18px",
  height: "18px",
  filter: "brightness(0) invert(1)",
};

const iconeStatusVerde = {
  width: "14px",
  height: "14px",
  filter: "invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)",
};

const iconeStatusVermelho = {
  width: "14px",
  height: "14px",
  filter: "invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)",
};

const botaoNovo = {
  backgroundColor: "#C97C8C",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
};