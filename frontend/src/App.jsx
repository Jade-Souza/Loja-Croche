// Importa o sistema de rotas
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas públicas
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import ProdutoDetalhe from "./pages/ProdutoDetalhe";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Carrinho from "./pages/Carrinho";
import Encomendas from "./pages/Encomendas";

// Login e Cadastro do Cliente
import LoginCliente from "./pages/LoginCliente";
import CadastroCliente from "./pages/CadastroCliente";

// Login Admin
import LoginAdmin from "./pages/LoginAdmin";

// Rotas protegidas
import RotaPrivada from "./routes/RotaPrivada";

// Admin
import Dashboard from "./pages/admin/Dashboard";
import ProdutosAdmin from "./pages/admin/ProdutosAdmin";
import PedidosAdmin from "./pages/admin/PedidosAdmin";
import ClientesAdmin from "./pages/admin/ClientesAdmin";
import EncomendasAdmin from "./pages/admin/EncomendasAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Site público */}
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/:id" element={<ProdutoDetalhe />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/encomendas" element={<Encomendas />} />

        {/* Autenticação do Cliente */}
        <Route path="/login" element={<LoginCliente />} />
        <Route path="/cadastro" element={<CadastroCliente />} />

        {/* Login Admin */}
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* Dashboard e Painel Admin */}
        <Route
          path="/admin"
          element={
            <RotaPrivada>
              <Dashboard />
            </RotaPrivada>
          }
        />

        {/* Produtos Admin */}
        <Route
          path="/admin/produtos"
          element={
            <RotaPrivada>
              <ProdutosAdmin />
            </RotaPrivada>
          }
        />

        {/* Pedidos Admin */}
        <Route
          path="/admin/pedidos"
          element={
            <RotaPrivada>
              <PedidosAdmin />
            </RotaPrivada>
          }
        />

        {/* Clientes Admin */}
        <Route
          path="/admin/clientes"
          element={
            <RotaPrivada>
              <ClientesAdmin />
            </RotaPrivada>
          }
        />

        {/* Encomendas Admin */}
        <Route
          path="/admin/encomendas"
          element={
            <RotaPrivada>
              <EncomendasAdmin />
            </RotaPrivada>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;