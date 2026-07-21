import { useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

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
            <h3>👥 Total de Clientes</h3>
            <h2>{clientes.length}</h2>
          </div>

          <div style={card}>
            <h3>💵 Ticket Médio</h3>
            <h2>R$ {ticketMedio}</h2>
          </div>

          <div style={card}>
            <h3>💰 Total Vendido</h3>
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
              <h3>{cliente.nome}</h3>

              <p>
                📱 {cliente.telefone}
              </p>

              <p>
                📍 {cliente.endereco}
              </p>
            </div>

            <div
              style={{
                textAlign: "right",
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
                💬 Conversar
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

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

const botaoWhatsapp = {
  backgroundColor: "#25D366",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};