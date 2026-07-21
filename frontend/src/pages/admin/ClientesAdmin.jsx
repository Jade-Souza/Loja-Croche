import { useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

// Importação dos ícones SVG
import usersIcon from "../../assets/icones/users.svg";
import receiptIcon from "../../assets/icones/receipt.svg";
import banknoteIcon from "../../assets/icones/banknote.svg";
import phoneIcon from "../../assets/icones/phone.svg";
import mapPinnedIcon from "../../assets/icones/map-pinned.svg";
import brandWhatsappIcon from "../../assets/icones/brand-whatsapp.svg";

export default function ClientesAdmin() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const clientesSalvos =
      JSON.parse(localStorage.getItem("clientes")) || [];

    setClientes(clientesSalvos);
  }, []);

  const ticketMedio =
    clientes.length > 0
      ? (
          clientes.reduce(
            (soma, cliente) =>
              soma + (cliente.totalGasto || 0),
            0
          ) / clientes.length
        ).toFixed(2)
      : "0.00";

  const totalVendido = clientes
    .reduce(
      (soma, cliente) =>
        soma + (cliente.totalGasto || 0),
      0
    )
    .toFixed(2);

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
          Clientes
        </h1>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div style={card}>
            <h3 style={tituloComIcone}>
              <img src={usersIcon} alt="Clientes" style={iconeCard} />
              Total de Clientes
            </h3>
            <h2>{clientes.length}</h2>
          </div>

          <div style={card}>
            <h3 style={tituloComIcone}>
              <img src={receiptIcon} alt="Ticket Médio" style={iconeCard} />
              Ticket Médio
            </h3>
            <h2>R$ {ticketMedio}</h2>
          </div>

          <div style={card}>
            <h3 style={tituloComIcone}>
              <img src={banknoteIcon} alt="Total Vendido" style={iconeCard} />
              Total Vendido
            </h3>
            <h2>R$ {totalVendido}</h2>
          </div>
        </div>

        {/* Sem clientes */}
        {clientes.length === 0 && (
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "15px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            Nenhum cliente cadastrado ainda.
          </div>
        )}

        {/* Lista de clientes */}
        {clientes.map((cliente, index) => (
          <div
            key={index}
            style={linha}
          >
            <div>
              <h3 style={{ marginBottom: "10px" }}>{cliente.nome}</h3>

              <p style={textoComIcone}>
                <img src={phoneIcon} alt="Telefone" style={iconeTexto} />
                {cliente.telefone}
              </p>

              <p style={textoComIcone}>
                <img src={mapPinnedIcon} alt="Endereço" style={iconeTexto} />
                {cliente.endereco}
              </p>
            </div>

            <div
              style={{
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "6px",
              }}
            >
              <p>
                <strong>Pedidos:</strong>{" "}
                {cliente.totalPedidos || 0}
              </p>

              <p>
                <strong>Total gasto:</strong>{" "}
                R$ {(cliente.totalGasto || 0).toFixed(2)}
              </p>

              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/55${cliente.telefone.replace(
                      /\D/g,
                      ""
                    )}`,
                    "_blank"
                  )
                }
                style={botaoWhatsapp}
              >
                <img src={brandWhatsappIcon} alt="WhatsApp" style={iconeBotao} />
                Conversar
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
  padding: "20px",
  borderRadius: "15px",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.06)",
};

const linha = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "15px",
  marginBottom: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.06)",
};

const tituloComIcone = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "1rem",
  marginBottom: "8px",
};

const textoComIcone = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  margin: "4px 0",
};

const iconeCard = {
  width: "20px",
  height: "20px",
};

const iconeTexto = {
  width: "16px",
  height: "16px",
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
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "8px",
};