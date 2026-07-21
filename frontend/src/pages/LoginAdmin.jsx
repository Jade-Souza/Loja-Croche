import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function fazerLogin(e) {
    e.preventDefault();

    if (
      email === "admin@elizcroche.com" &&
      senha === "123456"
    ) {
      localStorage.setItem(
        "adminLogado",
        "true"
      );

      navigate("/admin");
    } else {
      alert("Email ou senha inválidos");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAF5F0",
      }}
    >
      <form
        onSubmit={fazerLogin}
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "400px",
          boxShadow:
            "0 5px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#7A4E3A",
            marginBottom: "30px",
          }}
        >
          Login Admin
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) =>
            setSenha(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#C97C8C",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Entrar
        </button>
      </form>
    </main>
  );
}