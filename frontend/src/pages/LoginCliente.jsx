import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoginCliente() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setMensagemErro("");

    if (!email || !senha) {
      setMensagemErro("Preencha todos os campos para continuar.");
      return;
    }

    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    // Procura o cliente cadastrado
    const clienteEncontrado = clientes.find(
      (c) => c.email.toLowerCase() === email.toLowerCase() && c.senha === senha
    );

    if (!clienteEncontrado) {
      setMensagemErro("E-mail ou senha incorretos.");
      return;
    }

    // Salva sessão do cliente logado
    localStorage.setItem("clienteLogado", JSON.stringify(clienteEncontrado));

    alert(`Olá, ${clienteEncontrado.nome}! Login realizado com sucesso.`);
    navigate("/");
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF5F0", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "40px 20px" }}>
        <div style={cardContainer}>
          <h1 style={titulo}>Minha Conta</h1>
          <p style={subtitulo}>Acesse sua conta para ver seus pedidos e dados salvos.</p>

          {mensagemErro && <div style={alertaErro}>{mensagemErro}</div>}

          <form onSubmit={handleLogin} style={form}>
            <div style={grupoInput}>
              <label style={label}>E-mail</label>
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={input}
              />
            </div>

            <div style={grupoInput}>
              <label style={label}>Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={input}
              />
            </div>

            <button type="submit" style={botaoSubmit}>
              Entrar
            </button>
          </form>

          <p style={rodapeTexto}>
            Ainda não tem conta?{" "}
            <Link to="/cadastro" style={link}>
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Estilos compartilhados
const cardContainer = {
  backgroundColor: "#FFFFFF",
  padding: "40px",
  borderRadius: "20px",
  width: "100%",
  maxWidth: "480px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
};

const titulo = {
  color: "#7A4E3A",
  fontSize: "28px",
  textAlign: "center",
  marginBottom: "8px",
};

const subtitulo = {
  color: "#666",
  fontSize: "14px",
  textAlign: "center",
  marginBottom: "25px",
};

const alertaErro = {
  backgroundColor: "#FADBD8",
  color: "#78281F",
  padding: "10px 14px",
  borderRadius: "8px",
  fontSize: "14px",
  marginBottom: "20px",
  textAlign: "center",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const grupoInput = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const label = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#555",
};

const input = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #DDD",
  fontSize: "14px",
  outline: "none",
};

const botaoSubmit = {
  backgroundColor: "#C97C8C",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "10px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
};

const rodapeTexto = {
  marginTop: "25px",
  textAlign: "center",
  fontSize: "14px",
  color: "#666",
};

const link = {
  color: "#C97C8C",
  fontWeight: "bold",
  textDecoration: "none",
};