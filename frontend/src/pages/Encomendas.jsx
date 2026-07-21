// Importa React
import { useState } from "react";

// Importa o Header
import Header from "../components/Header";

// Página de Encomendas
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
    setTipo("");
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
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          {/* Nome */}
          <label>
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
          <label>
            WhatsApp
          </label>

          <input
            type="text"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="(00) 00000-0000"
            style={inputStyle}
          />

          {/* Tipo */}
          <label>
            Tipo da Peça
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
          <label>
            Cor Desejada
          </label>

          <input
            type="text"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            placeholder="Ex: Branco"
            style={inputStyle}
          />

          {/* Tamanho */}
          <label>
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
          <label>
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
          <label>
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
              fontWeight: "bold",
            }}
          >
            Solicitar Orçamento via WhatsApp
          </button>
        </div>
      </main>
    </>
  );
}

// Estilo padrão dos campos
const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #DDD",
  fontSize: "16px",
};