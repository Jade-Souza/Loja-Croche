// Importa React
import { useEffect, useState } from "react";

// Importa Header
import Header from "../components/Header";

// Importa Footer
import Footer from "../components/Footer";

// Página Carrinho
export default function Carrinho() {

  // Produtos do carrinho
  const [carrinho, setCarrinho] = useState([]);

  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [enderecoCliente, setEnderecoCliente] = useState("");

  // Carrega carrinho ao abrir a página
  useEffect(() => {
    const itens =
      JSON.parse(localStorage.getItem("carrinho")) || [];

    setCarrinho(itens);
  }, []);

  // Remove um item
  function removerItem(index) {

    const novoCarrinho = [...carrinho];

    novoCarrinho.splice(index, 1);

    setCarrinho(novoCarrinho);

    localStorage.setItem(
      "carrinho",
      JSON.stringify(novoCarrinho)
    );
  }

  // Aumenta quantidade
  function aumentarQuantidade(index) {

    const novoCarrinho = [...carrinho];

    novoCarrinho[index].quantidade += 1;

    setCarrinho(novoCarrinho);

    localStorage.setItem(
      "carrinho",
      JSON.stringify(novoCarrinho)
    );
  }

  // Diminui quantidade
  function diminuirQuantidade(index) {

    const novoCarrinho = [...carrinho];

    if (novoCarrinho[index].quantidade > 1) {
      novoCarrinho[index].quantidade -= 1;
    }

    setCarrinho(novoCarrinho);

    localStorage.setItem(
      "carrinho",
      JSON.stringify(novoCarrinho)
    );
  }

  // Esvazia carrinho
  function limparCarrinho() {

    localStorage.removeItem("carrinho");

    setCarrinho([]);
  }

  // Calcula total
  const total = carrinho.reduce((soma, item) => {
    return soma + item.preco * item.quantidade;
  }, 0);

  // Envia pedido para WhatsApp
  function finalizarPedido() {

    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    if (
      !nomeCliente ||
      !telefoneCliente ||
      !enderecoCliente
    ) {
      alert("Preencha nome, telefone e endereço.");
      return;
    }

    // Trocar pelo número real depois
    const numero = "5511999999999";

    let mensagem =
      "Olá! Gostaria de fazer o seguinte pedido:%0A%0A";

    carrinho.forEach((item) => {
      mensagem +=
        `🧶 ${item.nome}%0A` +
        `Cor: ${item.cor}%0A` +
        `Tamanho: ${item.tamanho}%0A` +
        `Quantidade: ${item.quantidade}%0A%0A`;
    });

    mensagem += `💰 Total: R$ ${total.toFixed(2)}`;

    mensagem +=
      `%0A%0ANome: ${nomeCliente}` +
      `%0AWhatsApp: ${telefoneCliente}` +
      `%0AEndereço: ${enderecoCliente}`;

    const pedidos =
       JSON.parse(localStorage.getItem("pedidos")) || [];

    const novoPedido = {
      id: Date.now(),
      cliente: nomeCliente,
      telefone: telefoneCliente,
      endereco: enderecoCliente,
      data: new Date().toLocaleDateString(),
      itens: carrinho,
      total,
      status: "Processando",
      };

    pedidos.push(novoPedido);

    localStorage.setItem(
      "pedidos",
      JSON.stringify(pedidos)
    );

        window.open(
      `https://wa.me/${numero}?text=${mensagem}`,
      "_blank"
    );

      localStorage.removeItem("carrinho");

      setCarrinho([]);
      
    //SALVAR CLIENTE
    const clientes =
      JSON.parse(localStorage.getItem("clientes")) || [];

    const clienteExistente = clientes.find(
      (cliente) =>
        cliente.telefone === telefoneCliente
    );

    if (clienteExistente) {
      clienteExistente.totalPedidos =
      (clienteExistente.totalPedidos || 0) + 1;

      clienteExistente.totalGasto =
      (clienteExistente.totalGasto || 0) + total;
    } else {
      clientes.push({
        nome: nomeCliente,
        telefone: telefoneCliente,
        endereco: enderecoCliente,
        totalPedidos: 1,
        totalGasto: total,
      });
    }

    localStorage.setItem(
      "clientes",
      JSON.stringify(clientes)
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
        {/* Título */}
        <h1
          style={{
            color: "#7A4E3A",
            marginBottom: "40px",
          }}
        >
          🛒 Meu Carrinho
        </h1>

        {/* Carrinho vazio */}
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
                  padding: "25px",
                  borderRadius: "20px",
                  marginBottom: "20px",
                  boxShadow:
                    "0 5px 15px rgba(0,0,0,0.08)",
                }}
              >
                <h2
                  style={{
                    color: "#7A4E3A",
                  }}
                >
                  {item.nome}
                </h2>

                <p>
                  <strong>Cor:</strong> {item.cor}
                </p>

                <p>
                  <strong>Tamanho:</strong> {item.tamanho}
                </p>

                <p>
                  <strong>Preço:</strong> R$ {item.preco}
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
                    onClick={() =>
                      diminuirQuantidade(index)
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantidade}
                  </span>

                  <button
                    onClick={() =>
                      aumentarQuantidade(index)
                    }
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <p
                  style={{
                    marginTop: "15px",
                    color: "#C97C8C",
                    fontWeight: "bold",
                  }}
                >
                  Subtotal: R$
                  {(item.preco * item.quantidade).toFixed(2)}
                </p>

                {/* Remover */}
                <button
                  onClick={() =>
                    removerItem(index)
                  }
                  style={{
                    marginTop: "15px",
                    backgroundColor: "#d9534f",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  🗑️ Remover
                </button>
              </div>
            ))}

            {/* Resumo */}
            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "20px",
                marginTop: "30px",
              }}
            >
              <h2
                style={{
                  color: "#7A4E3A",
                }}
              >
                Total: R$ {total.toFixed(2)}
              </h2>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={nomeCliente}
                  onChange={(e) =>
                    setNomeCliente(e.target.value)
                  }
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                  }}
                />

                <input
                  type="text"
                  placeholder="WhatsApp"
                  value={telefoneCliente}
                  onChange={(e) =>
                    setTelefoneCliente(e.target.value)
                  }
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                  }}
                />

                <input
                  type="text"
                  placeholder="Endereço"
                  value={enderecoCliente}
                  onChange={(e) =>
                    setEnderecoCliente(e.target.value)
                  }
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                  }}
                />
</div>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginTop: "20px",
                }}
              >
                {/* Limpar */}
                <button
                  onClick={limparCarrinho}
                  style={{
                    backgroundColor: "#777",
                    color: "white",
                    border: "none",
                    padding: "15px 25px",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  Esvaziar Carrinho
                </button>

                {/* Finalizar */}
                <button
                  onClick={finalizarPedido}
                  style={{
                    backgroundColor: "#C97C8C",
                    color: "white",
                    border: "none",
                    padding: "15px 25px",
                    borderRadius: "10px",
                    cursor: "pointer",
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