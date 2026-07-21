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

        {/* Site */}
        <Route path="/" element={<Home />} />

        <Route
          path="/produtos"
          element={<Produtos />}
        />

        <Route
          path="/produtos/:id"
          element={<ProdutoDetalhe />}
        />

        <Route
          path="/sobre"
          element={<Sobre />}
        />

        <Route
          path="/contato"
          element={<Contato />}
        />

        <Route
          path="/carrinho"
          element={<Carrinho />}
        />

        <Route
          path="/encomendas"
          element={<Encomendas />}
        />

        {/* Login Admin */}
        <Route
          path="/admin/login"
          element={<LoginAdmin />}
        />

        {/* Dashboard */}
        <Route
          path="/admin"
          element={
            <RotaPrivada>
              <Dashboard />
            </RotaPrivada>
          }
        />

        {/* Produtos */}
        <Route
          path="/admin/produtos"
          element={
            <RotaPrivada>
              <ProdutosAdmin />
            </RotaPrivada>
          }
        />

        {/* Pedidos */}
        <Route
          path="/admin/pedidos"
          element={
            <RotaPrivada>
              <PedidosAdmin />
            </RotaPrivada>
          }
        />

        {/* Clientes */}
        <Route
          path="/admin/clientes"
          element={
            <RotaPrivada>
              <ClientesAdmin />
            </RotaPrivada>
          }
        />

        <Route
        path="/admin/encomendas"
        element={<EncomendasAdmin />}
      />

      </Routes>
    </BrowserRouter>
  );
}

export default App;