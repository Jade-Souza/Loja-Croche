import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import plusIcon from "../assets/icones/plus.svg";
import minusIcon from "../assets/icones/minus.svg";
import trashIcon from "../assets/icones/trash-2.svg";
import "./Carrinho.css";

// Substitua pela Chave PIX oficial da Eliz Crochê
const CHAVE_PIX_DONO = "elizcroche@exemplo.com";

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);

  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [enderecoCliente, setEnderecoCliente] = useState("");

  // Método e dados de pagamento
  const [metodoPagamento, setMetodoPagamento] = useState("pix");
  const [copiado, setCopiado] = useState(false);
  const [dadosCartao, setDadosCartao] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: "",
  });

  // Carrega carrinho e dados do cliente logado ao abrir a página
  useEffect(() => {
    const itens = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(itens);

    // Se o cliente estiver logado, preenche os campos automaticamente
    const clienteLogado = JSON.parse(localStorage.getItem("clienteLogado"));
    if (clienteLogado) {
      setNomeCliente(clienteLogado.nome || "");
      setTelefoneCliente(clienteLogado.telefone || "");
      setEnderecoCliente(clienteLogado.endereco || "");
    }
  }, []);

  function removerItem(index) {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  }

  function aumentarQuantidade(index) {
    const novoCarrinho = [...carrinho];
    novoCarrinho[index].quantidade += 1;
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  }

  function diminuirQuantidade(index) {
    const novoCarrinho = [...carrinho];
    if (novoCarrinho[index].quantidade > 1) {
      novoCarrinho[index].quantidade -= 1;
    }
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  }

  function limparCarrinho() {
    localStorage.removeItem("carrinho");
    setCarrinho([]);
  }

  function copiarPix() {
    navigator.clipboard.writeText(CHAVE_PIX_DONO);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  }

  const total = carrinho.reduce((soma, item) => {
    return soma + item.preco * item.quantidade;
  }, 0);

  function finalizarPedido() {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    if (!nomeCliente || !telefoneCliente || !enderecoCliente) {
      alert("Preencha nome, telefone e endereço.");
      return;
    }

    // Validação caso escolha Cartão
    if (metodoPagamento === "cartao") {
      const { numero, nome, validade, cvv } = dadosCartao;
      if (!numero || !nome || !validade || !cvv) {
        alert("Preencha todos os dados do cartão de crédito.");
        return;
      }
    }

    // Substitua pelo número real da Eliz Crochê
    const numeroWhatsApp = "5531996833793";

    // Texto da mensagem sem emojis para o WhatsApp
    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:%0A%0A";

    carrinho.forEach((item) => {
      mensagem +=
        `• ${item.nome}%0A` +
        `Cor: ${item.cor}%0A` +
        `Tamanho: ${item.tamanho}%0A` +
        `Quantidade: ${item.quantidade}%0A%0A`;
    });

    mensagem += `Total: R$ ${total.toFixed(2)}%0A`;
    mensagem += `Forma de Pagamento: ${metodoPagamento === "pix" ? "PIX" : "Cartão de Crédito"}`;

    mensagem +=
      `%0A%0ANome: ${nomeCliente}` +
      `%0AWhatsApp: ${telefoneCliente}` +
      `%0AEndereço: ${enderecoCliente}`;

    // SALVAR PEDIDO NO LOCALSTORAGE (Visível no Admin)
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    const novoPedido = {
      id: Date.now(),
      cliente: nomeCliente,
      telefone: telefoneCliente,
      endereco: enderecoCliente,
      data: new Date().toLocaleDateString(),
      itens: carrinho,
      total,
      metodoPagamento: metodoPagamento === "pix" ? "PIX" : "Cartão de Crédito",
      status: "Processando",
    };

    pedidos.push(novoPedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    // SALVAR / ATUALIZAR CLIENTE
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    const clienteExistente = clientes.find(
      (cliente) => cliente.telefone === telefoneCliente
    );

    if (clienteExistente) {
      clienteExistente.totalPedidos = (clienteExistente.totalPedidos || 0) + 1;
      clienteExistente.totalGasto = (clienteExistente.totalGasto || 0) + total;
    } else {
      clientes.push({
        nome: nomeCliente,
        telefone: telefoneCliente,
        endereco: enderecoCliente,
        totalPedidos: 1,
        totalGasto: total,
      });
    }

    localStorage.setItem("clientes", JSON.stringify(clientes));

    // Redireciona para o WhatsApp
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagem}`, "_blank");

    localStorage.removeItem("carrinho");
    setCarrinho([]);
  }

  return (
    <>
      <Header />

      <main className="carrinho-main">
        <h1 className="carrinho-titulo">Meu Carrinho</h1>

        <p
          style={{
            textAlign: "center",
            color: "#777",
            marginBottom: "30px",
          }}
        >
          Revise seus produtos e escolha a forma de pagamento antes de finalizar.
        </p>

        {carrinho.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <h2>Seu carrinho está vazio.</h2>
          </div>
        ) : (
          <>
            {/* Lista de produtos */}
            {carrinho.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "20px",
                  marginBottom: "20px",
                  border: "1px solid #E7D8D2",
                  boxShadow: "0 8px 20px rgba(0,0,0,.06)",
                }}
              >
                <h2 style={{ color: "#7A4E3A", marginBottom: "8px" }}>
                  {item.nome}
                </h2>

                <p style={{ margin: "4px 0" }}>
                  <strong>Cor:</strong> {item.cor}
                </p>

                <p style={{ margin: "4px 0" }}>
                  <strong>Tamanho:</strong> {item.tamanho}
                </p>

                <p style={{ margin: "4px 0" }}>
                  <strong>Preço:</strong> R$ {item.preco.toFixed(2)}
                </p>

                {/* Quantidade */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginTop: "15px",
                  }}
                >
                  <button
                    onClick={() => diminuirQuantidade(index)}
                    style={botaoQuantidade}
                  >
                    <img
                      src={minusIcon}
                      alt="Diminuir"
                      style={{ width: "18px", height: "18px" }}
                    />
                  </button>

                  <span
                    style={{
                      minWidth: "24px",
                      textAlign: "center",
                      fontWeight: "600",
                      color: "#7A4E3A",
                    }}
                  >
                    {item.quantidade}
                  </span>

                  <button
                    onClick={() => aumentarQuantidade(index)}
                    style={botaoQuantidade}
                  >
                    <img
                      src={plusIcon}
                      alt="Aumentar"
                      style={{ width: "18px", height: "18px" }}
                    />
                  </button>
                </div>

                <p
                  style={{
                    marginTop: "15px",
                    color: "#C97C8C",
                    fontWeight: "bold",
                  }}
                >
                  Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}
                </p>

                <button
                  onClick={() => removerItem(index)}
                  style={{
                    marginTop: "15px",
                    backgroundColor: "#d9534f",
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
                    src={trashIcon}
                    alt="Remover"
                    style={{ width: "18px", height: "18px", filter: "brightness(0) invert(1)" }}
                  />
                  Remover
                </button>
              </div>
            ))}

            {/* Dados do Cliente e Forma de Pagamento */}
            <div
              style={{
                backgroundColor: "white",
                padding: "25px",
                borderRadius: "20px",
                marginTop: "30px",
                border: "1px solid #E7D8D2",
                boxShadow: "0 8px 20px rgba(0,0,0,.06)",
              }}
            >
              <h2
                style={{
                  color: "#C97C8C",
                  fontSize: "28px",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                Total: R$ {total.toFixed(2)}
              </h2>

              {/* Formulário de Dados */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "25px",
                }}
              >
                <h3 style={{ color: "#7A4E3A", fontSize: "18px", margin: 0 }}>
                  Dados para Entrega
                </h3>

                <input
                  type="text"
                  placeholder="Seu nome"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  style={inputEstilo}
                />

                <input
                  type="text"
                  placeholder="WhatsApp"
                  value={telefoneCliente}
                  onChange={(e) => setTelefoneCliente(e.target.value)}
                  style={inputEstilo}
                />

                <input
                  type="text"
                  placeholder="Endereço"
                  value={enderecoCliente}
                  onChange={(e) => setEnderecoCliente(e.target.value)}
                  style={inputEstilo}
                />
              </div>

              {/* Opções de Pagamento */}
              <div style={{ marginBottom: "25px" }}>
                <h3
                  style={{
                    color: "#7A4E3A",
                    fontSize: "18px",
                    marginBottom: "12px",
                  }}
                >
                  Forma de Pagamento
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <label style={radioContainer}>
                    <input
                      type="radio"
                      name="pagamento"
                      value="pix"
                      checked={metodoPagamento === "pix"}
                      onChange={() => setMetodoPagamento("pix")}
                    />
                    <span>
                      <strong>PIX</strong> (Transferência direta ao dono)
                    </span>
                  </label>

                  <label style={radioContainer}>
                    <input
                      type="radio"
                      name="pagamento"
                      value="cartao"
                      checked={metodoPagamento === "cartao"}
                      onChange={() => setMetodoPagamento("cartao")}
                    />
                    <span>
                      <strong>Cartão de Crédito</strong>
                    </span>
                  </label>
                </div>

                {/* Box do PIX */}
                {metodoPagamento === "pix" && (
                  <div
                    style={{
                      marginTop: "15px",
                      backgroundColor: "#FAF5F0",
                      padding: "15px",
                      borderRadius: "12px",
                      border: "1px dashed #C97C8C",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "14px",
                        color: "#555",
                      }}
                    >
                      Chave PIX da Eliz Crochê para pagamento:
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "white",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #E7D8D2",
                        flexWrap: "wrap",
                        gap: "10px"
                      }}
                    >
                      <strong style={{ color: "#7A4E3A", fontSize: "14px", wordBreak: "break-all" }}>
                        {CHAVE_PIX_DONO}
                      </strong>
                      <button
                        type="button"
                        onClick={copiarPix}
                        style={{
                          backgroundColor: "#7A4E3A",
                          color: "white",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {copiado ? "Copiado!" : "Copiar Chave"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Box do Cartão */}
                {metodoPagamento === "cartao" && (
                  <div
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Número do Cartão"
                      value={dadosCartao.numero}
                      onChange={(e) =>
                        setDadosCartao({
                          ...dadosCartao,
                          numero: e.target.value,
                        })
                      }
                      style={inputEstilo}
                    />

                    <input
                      type="text"
                      placeholder="Nome impresso no cartão"
                      value={dadosCartao.nome}
                      onChange={(e) =>
                        setDadosCartao({
                          ...dadosCartao,
                          nome: e.target.value,
                        })
                      }
                      style={inputEstilo}
                    />

                    <div style={{ display: "flex", gap: "10px" }}>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={dadosCartao.validade}
                        onChange={(e) =>
                          setDadosCartao({
                            ...dadosCartao,
                            validade: e.target.value,
                          })
                        }
                        style={inputEstilo}
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={dadosCartao.cvv}
                        onChange={(e) =>
                          setDadosCartao({
                            ...dadosCartao,
                            cvv: e.target.value,
                          })
                        }
                        style={inputEstilo}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Botões de Ação Responsivos */}
              <div className="carrinho-botoes-container">
                <button
                  onClick={limparCarrinho}
                  style={{
                    backgroundColor: "#777",
                    color: "white",
                    border: "none",
                    padding: "15px 25px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Esvaziar Carrinho
                </button>

                <button
                  onClick={finalizarPedido}
                  style={{
                    backgroundColor: "#C97C8C",
                    color: "white",
                    border: "none",
                    padding: "15px 25px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                    width: "100%",
                  }}
                >
                  Finalizar Pedido
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

// Estilos auxiliares
const botaoQuantidade = {
  width: "45px",
  height: "45px",
  border: "1px solid #E7D8D2",
  borderRadius: "10px",
  backgroundColor: "white",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const inputEstilo = {
  width: "100%",
  padding: "12px",
  border: "1px solid #E7D8D2",
  borderRadius: "12px",
  color: "#7A4E3A",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const radioContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px",
  border: "1px solid #E7D8D2",
  borderRadius: "10px",
  cursor: "pointer",
  backgroundColor: "#FAF5F0",
};