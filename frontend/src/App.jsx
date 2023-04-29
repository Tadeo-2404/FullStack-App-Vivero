import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";

// Componentes compartidos
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import NotFound from "./pages/NotFound";
import Productos from "./pages/Productos";

// Componentes de administrador
import InicioSesionAdmin from "./pages/admin/InicioSesionAdmin";
import FormPublicarProducto from "./pages/admin/FormPublicarProducto";
import FormEditarProducto from "./pages/admin/FormEditarProducto";
import FormAgregarVenta from "./pages/admin/FormAgregarVenta";
import FormAgregarProveedor from "./pages/admin/FormAgregarProveedor";
import Proveedores from "./pages/admin/Proveedores";
import Ventas from "./pages/admin/Ventas";
import FormEditarProveedor from "./pages/admin/FormEditarProveedor";

function App() {
  return (
    <Router>
        <Navbar />
        
        <Routes>

            <Route path="/" element={<Inicio />} />

            <Route path="/admin/iniciar-sesion" element={<InicioSesionAdmin />} />

            <Route path="/productos" element={<Productos />} />
            <Route path="/admin/publicar-producto" element={<FormPublicarProducto />} />
            <Route path="/admin/editar-producto/:id" element={<FormEditarProducto />} />

            <Route path="/admin/ventas" element={<Ventas />} />
            <Route path="/admin/agregar-venta" element={<FormAgregarVenta />} />

            <Route path="/admin/proveedores" element={<Proveedores />} />
            <Route path="/admin/agregar-proveedor" element={<FormAgregarProveedor />} />
            <Route path="/admin/editar-proveedor/:id" element={<FormEditarProveedor />} />

            <Route path="*" element={<NotFound />} />
            
        </Routes>

        <Footer /> 
    </Router>
  );
}

export default App;
