import { useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

// Importação dos ícones SVG
import brandWhatsappIcon from "../../assets/icones/brand-whatsapp.svg";
import usersIcon from "../../assets/icones/users.svg";
import phoneIcon from "../../assets/icones/phone.svg";
import clockIcon from "../../assets/icones/clock.svg";
import yarnIcon from "../../assets/icones/yarn.svg";
import sparklesIcon from "../../assets/icones/sparkles.svg";
import scissorsIcon from "../../assets/icones/scissors.svg";
import pencilIcon from "../../assets/icones/pencil.svg";

export default function EncomendasAdmin() {
  const [encomendas, setEncomendas] = useState([]);

  useEffect(() => {
    const encomendasSalvas =
      JSON.parse(localStorage.getItem("encomendas")) || [];

    setEncomendas(encomendasSalvas);
  }, []);

  function alterarStatus(id, novoStatus) {
    const novaLista = encomendas.map((encomenda) => {
      if (encomenda.id === id) {
        return {
          ...encomenda,
          status: novoStatus,
        };
      }
      return encomenda;
    });

    setEncomendas(novaLista);
    localStorage.setItem("encomendas", JSON.stringify(novaLista));
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
    const numero = encomenda.whatsapp.replace(/\D/g, "");

    const mensagem = encodeURIComponent(
      `Olá ${encomenda.cliente}!\n\nRecebi sua encomenda de ${encomenda.produto} e gostaria de conversar sobre os detalhes. 😊\n\nEliz Crochê`
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
          <div key={encomenda.id} style={card}>
            <h2 style={{ marginBottom: "15px" }}>
              Encomenda #{encomenda.id}
            </h2>

            <p style={itemLinha}>
              <img src={usersIcon} alt="Cliente" style={iconeCampo} />
              <strong>Cliente:</strong> {encomenda.cliente}
            </p>

            <p style={itemLinha}>
              <img src={phoneIcon} alt="WhatsApp" style={iconeCampo} />
              <strong>WhatsApp:</strong> {encomenda.whatsapp}
            </p>

            <p style={itemLinha}>
              <img src={clockIcon} alt="Data" style={iconeCampo} />
              <strong>Data:</strong> {encomenda.data}
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

            <p style={itemLinha}>
              <img src={yarnIcon} alt="Produto" style={iconeCampo} />
              <strong>Produto:</strong> {encomenda.produto}
            </p>

            <p style={itemLinha}>
              <img src={sparklesIcon} alt="Cor" style={iconeCampo} />
              <strong>Cor:</strong> {encomenda.cor}
            </p>

            <p style={itemLinha}>
              <img src={scissorsIcon} alt="Tamanho" style={iconeCampo} />
              <strong>Tamanho:</strong> {encomenda.tamanho}
            </p>

            <p style={itemLinha}>
              <img src={pencilIcon} alt="Observação" style={iconeCampo} />
              <strong>Observação:</strong> {encomenda.observacao}
            </p>

            <span
              style={{
                ...statusStyle,
                backgroundColor: corStatus(encomenda.status),
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
                onChange={(e) => alterarStatus(encomenda.id, e.target.value)}
                style={select}
              >
                <option>Aguardando</option>
                <option>Orçamento Enviado</option>
                <option>Em Produção</option>
                <option>Finalizada</option>
                <option>Entregue</option>
              </select>

              <button
                onClick={() => conversarWhatsapp(encomenda)}
                style={botaoWhatsapp}
              >
                <img
                  src={brandWhatsappIcon}
                  alt="WhatsApp"
                  style={iconeBotao}
                />
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
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};

const itemLinha = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  margin: "6px 0",
};

const iconeCampo = {
  width: "16px",
  height: "16px",
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
};