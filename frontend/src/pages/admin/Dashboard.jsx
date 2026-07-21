import { useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Importação dos ícones SVG
import banknoteIcon from "../../assets/icones/banknote.svg";
import packageIcon from "../../assets/icones/package.svg";
import yarnIcon from "../../assets/icones/yarn.svg";
import shoppingBagIcon from "../../assets/icones/shopping-bag.svg";
import usersIcon from "../../assets/icones/users.svg";
import starIcon from "../../assets/icones/star.svg";
import receiptIcon from "../../assets/icones/receipt.svg";

export default function Dashboard() {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalEncomendas, setTotalEncomendas] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [faturamento, setFaturamento] = useState(0);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [pedidosRecentes, setPedidosRecentes] = useState([]);
  const [encomendasRecentes, setEncomendasRecentes] = useState([]);
  const [processando, setProcessando] = useState(0);
  const [enviados, setEnviados] = useState(0);
  const [entregues, setEntregues] = useState(0);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [dadosGrafico, setDadosGrafico] = useState([]);

  useEffect(() => {
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const encomendas = JSON.parse(localStorage.getItem("encomendas")) || [];
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    setTotalPedidos(pedidos.length);
    setTotalEncomendas(encomendas.length);
    setTotalProdutos(produtos.length);
    setTotalClientes(clientes.length);

    const totalFaturamento = pedidos.reduce(
      (soma, pedido) => soma + (pedido.total || 0),
      0
    );

    setFaturamento(totalFaturamento);

    setPedidosRecentes(pedidos.slice(-5).reverse());
    setEncomendasRecentes(encomendas.slice(-5).reverse());

    setProcessando(pedidos.filter((p) => p.status === "Processando").length);
    setEnviados(pedidos.filter((p) => p.status === "Enviado").length);
    setEntregues(pedidos.filter((p) => p.status === "Entregue").length);

    const vendasPorMes = [
      { mes: "Jan", vendas: 0 },
      { mes: "Fev", vendas: 0 },
      { mes: "Mar", vendas: 0 },
      { mes: "Abr", vendas: 0 },
      { mes: "Mai", vendas: 0 },
      { mes: "Jun", vendas: 0 },
      { mes: "Jul", vendas: 0 },
      { mes: "Ago", vendas: 0 },
      { mes: "Set", vendas: 0 },
      { mes: "Out", vendas: 0 },
      { mes: "Nov", vendas: 0 },
      { mes: "Dez", vendas: 0 },
    ];

    const meses = [...vendasPorMes];

    pedidos.forEach((pedido) => {
      const partes = pedido.data.split("/");
      const mes = Number(partes[1]) - 1;
      meses[mes].vendas += pedido.total;
    });

    setDadosGrafico(meses);
  }, []);

  const produtosVendidos = Object.entries(
    JSON.parse(localStorage.getItem("pedidos") || "[]")
      .flatMap((pedido) => pedido.itens || [])
      .reduce((acc, item) => {
        acc[item.nome] = (acc[item.nome] || 0) + item.quantidade;
        return acc;
      }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([nome, qtd]) => ({
      nome,
      quantidade: qtd,
    }));

  const pedidosFiltrados = pedidosRecentes.filter((pedido) => {
    const nomeOk = pedido.cliente
      ?.toLowerCase()
      .includes(busca.toLowerCase());

    const statusOk =
      filtroStatus === "Todos" ? true : pedido.status === filtroStatus;

    return nomeOk && statusOk;
  });

  const dadosStatus = [
    {
      name: "Processando",
      value: processando,
    },
    {
      name: "Enviado",
      value: enviados,
    },
    {
      name: "Entregue",
      value: entregues,
    },
  ];

  const CORES = ["#ffc107", "#0d6efd", "#198754"];

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#FAF5F0",
        minHeight: "100vh",
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
          Dashboard
        </h1>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div style={card}>
            <h3 style={tituloComIcone}>
              <img src={banknoteIcon} alt="Faturamento" style={iconeCard} />
              Faturamento
            </h3>
            <h2>R$ {faturamento.toFixed(2)}</h2>
          </div>

          <div style={card}>
            <h3 style={tituloComIcone}>
              <img src={packageIcon} alt="Pedidos" style={iconeCard} />
              Pedidos
            </h3>
            <h2>{totalPedidos}</h2>
          </div>

          <div style={card}>
            <h3 style={tituloComIcone}>
              <img src={yarnIcon} alt="Encomendas" style={iconeCard} />
              Encomendas
            </h3>
            <h2>{totalEncomendas}</h2>
          </div>

          <div style={card}>
            <h3 style={tituloComIcone}>
              <img src={shoppingBagIcon} alt="Produtos" style={iconeCard} />
              Produtos
            </h3>
            <h2>{totalProdutos}</h2>
          </div>

          <div style={card}>
            <h3 style={tituloComIcone}>
              <img src={usersIcon} alt="Clientes" style={iconeCard} />
              Clientes
            </h3>
            <h2>{totalClientes}</h2>
          </div>
        </div>

        {/* Área dos gráficos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div style={card}>
            <h2>Vendas por mês</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosGrafico}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="vendas"
                  fill="#C97C8C"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={card}>
            <h2>Mais vendidos</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={produtosVendidos} layout="vertical">
                <XAxis type="number" />

                <YAxis dataKey="nome" type="category" width={120} />

                <Tooltip />

                <Bar
                  dataKey="quantidade"
                  fill="#7A4E3A"
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div style={card}>
            <h3 style={tituloComIcone}>
              <img src={starIcon} alt="Melhor Cliente" style={iconeCard} />
              Melhor Cliente
            </h3>

            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              {JSON.parse(localStorage.getItem("clientes") || "[]").sort(
                (a, b) => (b.totalGasto || 0) - (a.totalGasto || 0)
              )[0]?.nome || "Nenhum"}
            </p>
          </div>

          <div style={card}>
            <h3 style={tituloComIcone}>
              <img src={receiptIcon} alt="Maior Compra" style={iconeCard} />
              Maior Compra
            </h3>

            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              R${" "}
              {Math.max(
                ...(JSON.parse(
                  localStorage.getItem("pedidos") || "[]"
                ).map((p) => p.total || 0)),
                0
              ).toFixed(2)}
            </p>
          </div>

          <div style={card}>
            <h3 style={tituloComIcone}>
              <img src={packageIcon} alt="Status" style={iconeCard} />
              Status dos Pedidos
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dadosStatus}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {dadosStatus.map((entry, index) => (
                    <Cell key={index} fill={CORES[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          />

          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            <option>Todos</option>
            <option>Processando</option>
            <option>Enviado</option>
            <option>Entregue</option>
          </select>
        </div>

        {/* Pedidos recentes */}
        <div style={card}>
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Pedidos Recentes
          </h2>

          {pedidosFiltrados.map((pedido) => (
            <Pedido
              key={pedido.id}
              numero={pedido.id}
              cliente={pedido.cliente}
              valor={`R$ ${pedido.total.toFixed(2)}`}
              status={pedido.status}
              cor={
                pedido.status === "Entregue"
                  ? "#198754"
                  : pedido.status === "Enviado"
                  ? "#0d6efd"
                  : "#ffc107"
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function Pedido({ numero, cliente, valor, status, cor }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <div>
        <strong>Pedido #{numero}</strong>
        <p>{cliente}</p>
      </div>

      <div>{valor}</div>

      <span
        style={{
          backgroundColor: cor,
          color: "white",
          padding: "6px 12px",
          borderRadius: "999px",
        }}
      >
        {status}
      </span>
    </div>
  );
}

// Estilos
const card = {
  backgroundColor: "white",
  borderRadius: "20px",
  padding: "25px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};

const tituloComIcone = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "1rem",
  marginBottom: "8px",
  fontWeight: "normal",
};

const iconeCard = {
  width: "20px",
  height: "20px",
};