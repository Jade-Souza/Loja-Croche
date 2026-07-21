import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CadastroCliente() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    endereco: "",
  });

  const [mensagemErro, setMensagemErro] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleCadastro(e) {
    e.preventDefault();
    setMensagemErro("");

    const { nome, email, senha, telefone, endereco } = formData;

    if (!nome || !email || !senha || !telefone || !endereco) {
      setMensagemErro("Por favor, preencha todos os campos.");
      return;
    }

    // Busca clientes cadastrados no localStorage
    const clientesExistentes =
      JSON.parse(localStorage.getItem("clientes")) || [];

    // Verifica se e-mail já existe
    const jaExiste = clientesExistentes.some(
      (c) => c.email.toLowerCase() === email.toLowerCase()
    );

    if (jaExiste) {
      setMensagemErro("Já existe uma conta cadastrada com este e-mail.");
      return;
    }

    const novoCliente = {
      id: Date.now(),
      ...formData,
    };

    // Salva na lista global de clientes
    const novaLista = [...clientesExistentes, novoCliente];
    localStorage.setItem("clientes", JSON.stringify(novaLista));

    // Loga automaticamente o cliente cadastrado
    localStorage.setItem("clienteLogado", JSON.stringify(novoCliente));

    alert("Cadastro realizado com sucesso! Bem-vindo(a) à Eliz Crochê.");
    navigate("/");
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF5F0", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "40px 20px" }}>
        <div style={cardContainer}>
          <h1 style={titulo}>Criar uma Conta</h1>
          <p style={subtitulo}>Cadastre-se para acompanhar seus pedidos e realizar compras mais rápido.</p>

          {mensagemErro && <div style={alertaErro}>{mensagemErro}</div>}

          <form onSubmit={handleCadastro} style={form}>
            <div style={grupoInput}>
              <label style={label}>Nome Completo</label>
              <input
                type="text"
                name="nome"
                placeholder="Ex: Maria Silva"
                value={formData.nome}
                onChange={handleChange}
                style={input}
              />
            </div>

            <div style={grupoInput}>
              <label style={label}>E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                style={input}
              />
            </div>

            <div style={grupoInput}>
              <label style={label}>Senha</label>
              <input
                type="password"
                name="senha"
                placeholder="••••••••"
                value={formData.senha}
                onChange={handleChange}
                style={input}
              />
            </div>

            <div style={grupoInput}>
              <label style={label}>Telefone / WhatsApp</label>
              <input
                type="text"
                name="telefone"
                placeholder="(11) 99999-9999"
                value={formData.telefone}
                onChange={handleChange}
                style={input}
              />
            </div>

            <div style={grupoInput}>
              <label style={label}>Endereço de Entrega</label>
              <textarea
                name="endereco"
                placeholder="Rua, Número, Bairro, Cidade - Estado, CEP"
                value={formData.endereco}
                onChange={handleChange}
                rows={3}
                style={{ ...input, resize: "vertical" }}
              />
            </div>

            <button type="submit" style={botaoSubmit}>
              Cadastrar
            </button>
          </form>

          <p style={rodapeTexto}>
            Já possui uma conta?{" "}
            <Link to="/login" style={link}>
              Faça login
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}