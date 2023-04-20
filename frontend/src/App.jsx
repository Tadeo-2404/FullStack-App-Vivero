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
import Sustratos from "./pages/Sustratos";
import Sucursales from "./pages/Sucursales";

// Componentes de administrador
import InicioSesionAdmin from "./pages/admin/InicioSesionAdmin";
import FormPublicarProducto from "./pages/admin/FormPublicarProducto";
import FormEditarArticulo from "./pages/admin/FormEditarArticulo";
import Proveedores from "./pages/admin/Proveedores";

function App() {
  return (
    <Router>
        <Navbar />
        
        <Routes>

            {/* CLIENTES O CUALQUIER USUARIO */}
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/sustratos" element={<Sustratos />} />
            <Route path="/sucursales" element={<Sucursales />} />

            {/* ADMIN */}
            <Route path="/admin/iniciar-sesion" element={<InicioSesionAdmin />} />
            <Route path="/admin/publicar" element={<FormPublicarProducto />} />
            <Route path="/admin/editar/:tipo/:id" element={<FormEditarArticulo />} />
            <Route path="/admin/proveedores" element={<Proveedores />} />

            <Route path="*" element={<NotFound />} />
            
        </Routes>

        <Footer /> 
    </Router>
  );
}

export default App;
