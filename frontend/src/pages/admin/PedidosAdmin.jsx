import { useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

export default function PedidosAdmin() {

  const [pedidos, setPedidos] = useState([]);

  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
  const pedidosSalvos =
    JSON.parse(
      localStorage.getItem("pedidos")
    ) || [];

  setPedidos(pedidosSalvos);
  }, []);

  function alterarStatus(id, novoStatus) {
    const novaLista = pedidos.map((pedido) => {
      if (pedido.id === id) {
        return {
          ...pedido,
          status: novoStatus,
        };
      }

      return pedido;
    });

    setPedidos(novaLista);

    localStorage.setItem(
      "pedidos",
      JSON.stringify(novaLista)
    );
  }

  const pedidosFiltrados =
    filtro === "Todos"
      ? pedidos
      : pedidos.filter(
          (pedido) =>
            pedido.status === filtro
        );

  function corStatus(status) {
    switch (status) {
      case "Processando":
        return "#f0ad4e";

      case "Enviado":
        return "#5bc0de";

      case "Entregue":
        return "#5cb85c";

      case "Cancelado":
        return "#d9534f";

      default:
        return "#999";
    }
  }

  function falarComCliente(pedido) {

    const numero = pedido.telefone.replace(
      /\D/g,
      ""
    );

    const mensagem =
      encodeURIComponent(
        `Olá ${pedido.cliente}! 😊

  Estou entrando em contato sobre seu pedido #${pedido.id} da Eliz Crochê.`
      );

    window.open(
      `https://wa.me/55${numero}?text=${mensagem}`,
      "_blank"
    );
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
          Pedidos
        </h1>

        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <select
            value={filtro}
            onChange={(e) =>
              setFiltro(e.target.value)
            }
            style={select}
          >
            <option>Todos</option>
            <option>Processando</option>
            <option>Enviado</option>
            <option>Entregue</option>
            <option>Cancelado</option>
          </select>
        </div>

        {pedidosFiltrados.map(
          (pedido) => (
            <div
              key={pedido.id}
              style={card}
            >
              <h2>
                Pedido #{pedido.id}
              </h2>

              <p>
                <strong>Data:</strong>{" "}
                {pedido.data}
              </p>

              <p>
                <strong>Itens:</strong>
              </p>

             <div
              style={{
                marginTop: "10px",
              }}
            >
              {pedido.itens?.map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#FAF5F0",
                    padding: "12px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <strong>{item.nome}</strong>

                  <p>
                    Cor: {item.cor}
                  </p>

                  <p>
                    Tamanho: {item.tamanho}
                  </p>

                  <p>
                    Quantidade: {item.quantidade}
                  </p>

                  <p>
                    Subtotal: R$
                    {(item.preco * item.quantidade).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

              <p>
                <strong>
                  Cliente:
                </strong>{" "}
                {pedido.cliente}
              </p>

              <p>
              <strong>Telefone:</strong>{" "}
              {pedido.telefone}
            </p>
            
            
            <p>
              <strong>Endereço:</strong>{" "}
              {pedido.endereco}
            </p>

              <button
                onClick={() =>
                  falarComCliente(pedido)
                }
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginTop: "10px",
                  marginBottom: "15px",
                }}
              >
                💬 Falar com Cliente
              </button>

              <p>
                <strong>
                  Total:
                </strong>{" "}
                R$ {pedido.total.toFixed(2)}
              </p>

              <span
                style={{
                  ...status,
                  backgroundColor:
                    corStatus(
                      pedido.status
                    ),
                }}
              >
                {pedido.status}
              </span>

              <div
                style={{
                  marginTop: "20px",
                }}
              >
                <button
                  style={botao}
                  onClick={() =>
                    alterarStatus(
                      pedido.id,
                      "Processando"
                    )
                  }
                >
                  Processando
                </button>

                <button
                  style={botao}
                  onClick={() =>
                    alterarStatus(
                      pedido.id,
                      "Enviado"
                    )
                  }
                >
                  Enviado
                </button>

                <button
                  style={botao}
                  onClick={() =>
                    alterarStatus(
                      pedido.id,
                      "Entregue"
                    )
                  }
                >
                  Entregue
                </button>

                <button
                  style={botaoCancelar}
                  onClick={() =>
                    alterarStatus(
                      pedido.id,
                      "Cancelado"
                    )
                  }
                >
                  Cancelar
                </button>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}

const card = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "20px",
  marginBottom: "20px",
  maxWidth: "700px",
};

const select = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
};

const status = {
  display: "inline-block",
  marginTop: "10px",
  color: "white",
  padding: "8px 12px",
  borderRadius: "999px",
};

const botao = {
  marginRight: "10px",
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const botaoCancelar = {
  ...botao,
  backgroundColor: "#d9534f",
  color: "white",
};