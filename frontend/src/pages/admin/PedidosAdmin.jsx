import { useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

// Importação dos ícones SVG
import brandWhatsappIcon from "../../assets/icones/brand-whatsapp.svg";
import clockIcon from "../../assets/icones/clock.svg";
import packageIcon from "../../assets/icones/package.svg";
import sparklesIcon from "../../assets/icones/sparkles.svg";
import scissorsIcon from "../../assets/icones/scissors.svg";
import usersIcon from "../../assets/icones/users.svg";
import phoneIcon from "../../assets/icones/phone.svg";
import mapPinnedIcon from "../../assets/icones/map-pinned.svg";
import banknoteIcon from "../../assets/icones/banknote.svg";

export default function PedidosAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
    const pedidosSalvos =
      JSON.parse(localStorage.getItem("pedidos")) || [];

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
    localStorage.setItem("pedidos", JSON.stringify(novaLista));
  }

  const pedidosFiltrados =
    filtro === "Todos"
      ? pedidos
      : pedidos.filter((pedido) => pedido.status === filtro);

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
    const numero = pedido.telefone.replace(/\D/g, "");

    const mensagem = encodeURIComponent(
      `Olá ${pedido.cliente}! 😊\n\nEstou entrando em contato sobre seu pedido #${pedido.id} da Eliz Crochê.`
    );

    window.open(`https://wa.me/55${numero}?text=${mensagem}`, "_blank");
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

        <div style={{ marginBottom: "30px" }}>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            style={select}
          >
            <option>Todos</option>
            <option>Processando</option>
            <option>Enviado</option>
            <option>Entregue</option>
            <option>Cancelado</option>
          </select>
        </div>

        {pedidosFiltrados.map((pedido) => (
          <div key={pedido.id} style={card}>
            <h2 style={{ marginBottom: "15px" }}>Pedido #{pedido.id}</h2>

            <p style={itemLinha}>
              <img src={clockIcon} alt="Data" style={iconeCampo} />
              <strong>Data:</strong> {pedido.data}
            </p>

            <p style={itemLinha}>
              <img src={packageIcon} alt="Itens" style={iconeCampo} />
              <strong>Itens:</strong>
            </p>

            <div style={{ marginTop: "10px" }}>
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
                  <strong style={{ display: "block", marginBottom: "4px" }}>
                    {item.nome}
                  </strong>

                  <p style={itemLinhaPequeno}>
                    <img src={sparklesIcon} alt="Cor" style={iconeCampoPequeno} />
                    Cor: {item.cor}
                  </p>

                  <p style={itemLinhaPequeno}>
                    <img src={scissorsIcon} alt="Tamanho" style={iconeCampoPequeno} />
                    Tamanho: {item.tamanho}
                  </p>

                  <p style={{ fontSize: "0.9rem", color: "#555", margin: "2px 0" }}>
                    Quantidade: {item.quantidade}
                  </p>

                  <p style={{ fontSize: "0.9rem", fontWeight: "bold", marginTop: "4px" }}>
                    Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <p style={itemLinha}>
              <img src={usersIcon} alt="Cliente" style={iconeCampo} />
              <strong>Cliente:</strong> {pedido.cliente}
            </p>

            <p style={itemLinha}>
              <img src={phoneIcon} alt="Telefone" style={iconeCampo} />
              <strong>Telefone:</strong> {pedido.telefone}
            </p>

            <p style={itemLinha}>
              <img src={mapPinnedIcon} alt="Endereço" style={iconeCampo} />
              <strong>Endereço:</strong> {pedido.endereco}
            </p>

            <button
              onClick={() => falarComCliente(pedido)}
              style={botaoWhatsapp}
            >
              <img src={brandWhatsappIcon} alt="WhatsApp" style={iconeBotao} />
              Falar com Cliente
            </button>

            <p style={itemLinha}>
              <img src={banknoteIcon} alt="Total" style={iconeCampo} />
              <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
            </p>

            <span
              style={{
                ...statusStyle,
                backgroundColor: corStatus(pedido.status),
              }}
            >
              {pedido.status}
            </span>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button
                style={botao}
                onClick={() => alterarStatus(pedido.id, "Processando")}
              >
                Processando
              </button>

              <button
                style={botao}
                onClick={() => alterarStatus(pedido.id, "Enviado")}
              >
                Enviado
              </button>

              <button
                style={botao}
                onClick={() => alterarStatus(pedido.id, "Entregue")}
              >
                Entregue
              </button>

              <button
                style={botaoCancelar}
                onClick={() => alterarStatus(pedido.id, "Cancelado")}
              >
                Cancelar
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

// Estilos
const card = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "20px",
  marginBottom: "20px",
  maxWidth: "700px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};

const select = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
};

const itemLinha = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  margin: "8px 0",
};

const itemLinhaPequeno = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "0.9rem",
  color: "#555",
  margin: "2px 0",
};

const iconeCampo = {
  width: "16px",
  height: "16px",
};

const iconeCampoPequeno = {
  width: "14px",
  height: "14px",
};

const iconeBotao = {
  width: "18px",
  height: "18px",
  filter: "brightness(0) invert(1)",
};

const botaoWhatsapp = {
  backgroundColor: "#25D366",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "10px",
  marginBottom: "15px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const statusStyle = {
  display: "inline-block",
  marginTop: "10px",
  color: "white",
  padding: "8px 12px",
  borderRadius: "999px",
  fontWeight: "bold",
};

const botao = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: "#eee",
  color: "#333",
  fontWeight: "500",
};

const botaoCancelar = {
  ...botao,
  backgroundColor: "#d9534f",
  color: "white",
};