import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";

// Componentes compartidos
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import NotFound from "./pages/NotFound";
import Productos from "./pages/Productos";
import ScrollToTop from "./components/ScrollToTop";

import InicioSesionAdmin from "./pages/InicioSesionAdmin";
import FormPublicarProducto from "./pages/FormPublicarProducto";
import FormEditarProducto from "./pages/FormEditarProducto";
import FormAgregarVenta from "./pages/FormAgregarVenta";
import FormAgregarProveedor from "./pages/FormAgregarProveedor";
import Proveedores from "./pages/Proveedores";
import Ventas from "./pages/Ventas";
import FormEditarProveedor from "./pages/FormEditarProveedor";
import Compras from "./pages/Compras";
import FormAgregarCompra from "./pages/FormAgregarCompra";

function App() {
  return (
    <Router>
        <Toaster />

        <Navbar />
          
        <ScrollToTop>
          <Routes>

              <Route path="/" element={<Inicio />} />

              <Route path="/iniciar-sesion" element={<InicioSesionAdmin />} />

              <Route path="/productos" element={<Productos />} />
              <Route path="/publicar-producto" element={<FormPublicarProducto />} />
              <Route path="/editar-producto/:id" element={<FormEditarProducto />} />

              <Route path="/proveedores" element={<Proveedores />} />
              <Route path="/agregar-proveedor" element={<FormAgregarProveedor />} />
              <Route path="/editar-proveedor/:id" element={<FormEditarProveedor />} />

              <Route path="/ventas" element={<Ventas />} />
              <Route path="/agregar-venta" element={<FormAgregarVenta />} />

              <Route path="/compras" element={<Compras />} />
              <Route path="/agregar-compra" element={<FormAgregarCompra />} />

              <Route path="*" element={<NotFound />} />
              
          </Routes>
        </ScrollToTop>

        <Footer /> 
    </Router>
  );
}

export default App;
