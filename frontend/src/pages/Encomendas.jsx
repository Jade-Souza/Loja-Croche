import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import whatsappIcon from "../assets/icones/whatsapp.svg";
import arrowIcon from "../assets/icones/arrow-right.svg";

export default function Encomendas() {

  // Estados do formulário
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [tipo, setTipo] = useState("Top");
  const [cor, setCor] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("");

  // Função para abrir WhatsApp
  function enviarWhatsapp() {
    if(
      !nome || 
      !whatsapp || 
      !cor ||
      !tamanho
    ){
      alert("Preencha todos os campos.");
      return;
    }

    const novaEncomenda = {
      id: Date.now(),
      cliente: nome,
      whatsapp,
      produto: tipo,
      cor,
      tamanho,
      observacao: descricao,
      foto,
      status: "Aguardando",
      data: new Date().toLocaleDateString(),
    };

    const encomendas =
      JSON.parse(
        localStorage.getItem("encomendas")
      ) || [];

    encomendas.push(novaEncomenda);

    localStorage.setItem(
      "encomendas",
      JSON.stringify(encomendas)
    );

    const numero = "5531996833793";

    const mensagem = `
      Olá! Gostaria de solicitar uma encomenda personalizada.

       Nome: ${nome}
        WhatsApp: ${whatsapp}
       Tipo da peça: ${tipo}
       Cor desejada: ${cor}
       Tamanho: ${tamanho}
       Descrição:
      ${descricao}
    `;
    
    const texto = 
      encodeURIComponent(mensagem);
    
    window.open(
      `https://wa.me/${numero}?text=${texto}`,
    "_blank"
    );

    alert(
      "Encomenda enviada com sucesso!"
    );

    setNome("");
    setWhatsapp("");
    setTipo("Top");
    setCor("");
    setTamanho("");
    setDescricao("");
    setFoto("");
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
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <h1
            style={{
              color: "#7A4E3A",
              fontSize: "48px",
            }}
          >
             Encomendas Personalizadas
          </h1>

          <p
            style={{
              color: "#666",
              marginTop: "15px",
              fontSize: "18px",
            }}
          >
            Não encontrou o que procura?
            Envie uma referência e criaremos
            uma peça exclusiva para você.
          </p>
        </div>

        {/* Formulário */}
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "20px",
            border: "1px solid #E7D8D2",
            boxShadow: "0 8px 20px rgba(0,0,0,.06)",
          }}
        >
          {/* Nome */}
          <label
            style={{
              color: "#7A4E3A",
              fontWeight: "600",
            }}
          >
            Nome Completo
          </label>

          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            style={inputStyle}
          />

          {/* WhatsApp */}
          <label
            style={{
              color: "#7A4E3A",
              fontWeight: "600",
            }}
            >
            WhatsApp
          </label>

          <input
            type="text"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="(31) 99683-3793"
            style={inputStyle}
          />

          {/* Tipo */}
          <label
            style={{
              color: "#7A4E3A",
              fontWeight: "600",
            }}
            >
            Tipo
          </label>

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            style={inputStyle}
          >
            <option>Top</option>
            <option>Vestido</option>
            <option>Cardigan</option>
            <option>Bolsa</option>
            <option>Biquíni</option>
            <option>Outro</option>
          </select>

          {/* Cor */}
          <label
            style={{
              color: "#7A4E3A",
              fontWeight: "600",
            }}
            >
            Cor
          </label>

          <input
            type="text"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            placeholder="Ex: Branco"
            style={inputStyle}
          />

          {/* Tamanho */}
          <label
            style={{
              color: "#7A4E3A",
              fontWeight: "600",
            }}
            >
            Tamanho
          </label>

          <select
            value={tamanho}
            onChange={(e) => setTamanho(e.target.value)}
            style={inputStyle}
          >
            <option value="">Selecione</option>
            <option>P</option>
            <option>M</option>
            <option>G</option>
            <option>GG</option>
            <option>Único</option>
          </select>

          {/* Upload */}
          <label
            style={{
              color: "#7A4E3A",
              fontWeight: "600",
            }}
            >
            Foto de Referência
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {

              const arquivo = e.target.files[0];

              if(!arquivo)return;

              const leitor = new FileReader();

              leitor.onloadend = () =>{
                setFoto(leitor.result);
              };

              leitor.readAsDataURL(arquivo);
            }}
            style={inputStyle}
          />

          {/* Descrição */}
          <label
            style={{
              color: "#7A4E3A",
              fontWeight: "600",
            }}
            >
            Descrição da Encomenda
          </label>

          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows="6"
            placeholder="Descreva sua ideia..."
            style={inputStyle}
          />

          {/* Botão */}
          <button
            onClick={enviarWhatsapp}
            style={{
              width: "100%",
              marginTop: "20px",
              backgroundColor: "#C97C8C",
              color: "white",
              border: "none",
              padding: "18px",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "600",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img
              src={whatsappIcon}
              alt=""
              style={{
                width: "20px",
                filter: "brightness(0) invert(1)",
              }}
            />

            Solicitar Orçamento

            <img
              src={arrowIcon}
              alt=""
              style={{
                width: "16px",
                filter: "brightness(0) invert(1)",
              }}
            />
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Estilo padrão dos campos
const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "12px",
  border: "1px solid #E7D8D2",
  fontSize: "15px",
  color: "#7A4E3A",
};