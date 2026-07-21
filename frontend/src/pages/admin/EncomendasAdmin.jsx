import { useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

export default function EncomendasAdmin() {

  const [encomendas, setEncomendas] = useState([]);

  useEffect(() => {
    const encomendasSalvas =
      JSON.parse(
        localStorage.getItem("encomendas")
      ) || [];

    setEncomendas(encomendasSalvas);
  }, []);

  function alterarStatus(id, novoStatus) {

    const novaLista = encomendas.map(
      (encomenda) => {

        if (encomenda.id === id) {
          return {
            ...encomenda,
            status: novoStatus,
          };
        }

        return encomenda;
      }
    );

    setEncomendas(novaLista);

    localStorage.setItem(
      "encomendas",
      JSON.stringify(novaLista)
    );
  }

  function corStatus(status) {

    switch (status) {

      case "Aguardando":
        return "#ffc107";

      case "Orçamento Enviado":
        return "#0d6efd";

      case "Em Produção":
        return "#fd7e14";

      case "Finalizada":
        return "#20c997";

      case "Entregue":
        return "#198754";

      default:
        return "#999";
    }
  }

  function conversarWhatsapp(encomenda) {

    const numero = encomenda.whatsapp.replace(
        /\D/g,
        ""
    );

    const mensagem =
        encodeURIComponent(
        `Olá ${encomenda.cliente}!

    Recebi sua encomenda de ${encomenda.produto} e gostaria de conversar sobre os detalhes. 😊

    Eliz Crochê`
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
            marginBottom: "10px",
          }}
        >
          Encomendas
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Total de encomendas: {encomendas.length}
        </p>

        {encomendas.length === 0 && (
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            Nenhuma encomenda recebida.
          </div>
        )}

        {encomendas.map((encomenda) => (

          <div
            key={encomenda.id}
            style={card}
          >
            <h2>
              Encomenda #{encomenda.id}
            </h2>

            <p>
              <strong>Cliente:</strong>{" "}
              {encomenda.cliente}
            </p>

            <p>
              <strong>WhatsApp:</strong>{" "}
              {encomenda.whatsapp}
            </p>

            <p>
              <strong>Data:</strong>{" "}
              {encomenda.data}
            </p>

            {encomenda.foto && (
              <img
                src={encomenda.foto}
                alt="Referência"
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginTop: "10px",
                  marginBottom: "15px",
                  border: "2px solid #F6DDE5",
                }}
              />
            )}

            <p>
              <strong>Produto:</strong>{" "}
              {encomenda.produto}
            </p>

            <p>
              <strong>Cor:</strong>{" "}
              {encomenda.cor}
            </p>

            <p>
              <strong>Tamanho:</strong>{" "}
              {encomenda.tamanho}
            </p>

            <p>
              <strong>Observação:</strong>{" "}
              {encomenda.observacao}
            </p>

            <span
              style={{
                ...statusStyle,
                backgroundColor: corStatus(
                  encomenda.status
                ),
              }}
            >
              {encomenda.status}
            </span>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <select
                value={encomenda.status}
                onChange={(e) =>
                  alterarStatus(
                    encomenda.id,
                    e.target.value
                  )
                }
                style={select}
              >
                <option>Aguardando</option>
                <option>Orçamento Enviado</option>
                <option>Em Produção</option>
                <option>Finalizada</option>
                <option>Entregue</option>
              </select>

              <button
                onClick={() =>
                    conversarWhatsapp(encomenda)
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
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "20px",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.06)",
};

const select = {
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ddd",
};

const statusStyle = {
  display: "inline-block",
  marginTop: "15px",
  color: "white",
  padding: "8px 14px",
  borderRadius: "999px",
  fontWeight: "bold",
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