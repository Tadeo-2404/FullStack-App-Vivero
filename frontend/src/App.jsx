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
import Sucursales from "./pages/Sucursales";

// Componentes de usuarios
import InicioSesion from "./pages/cliente/InicioSesion";
import Registro from "./pages/cliente/Registro";

// Componentes de administrador
import InicioSesionAdmin from "./pages/admin/InicioSesionAdmin";
import FormPublicarProducto from "./pages/admin/FormPublicarProducto";
import FormEditarProducto from "./pages/admin/FormEditarProducto";
import Proveedores from "./pages/admin/Proveedores";

function App() {
  return (
    <Router>
        <Navbar />
        
        <Routes>

            {/* CLIENTES O CUALQUIER USUARIO */}
            <Route path="/" element={<Inicio />} />
            <Route path="/registrarse" element={<Registro />} />
            <Route path="/iniciar-sesion" element={<InicioSesion />} />
            <Route path="/sucursales" element={<Sucursales />} />

            {/* ADMIN */}
            <Route path="/admin/iniciar-sesion" element={<InicioSesionAdmin />} />
            <Route path="/admin/publicar" element={<FormPublicarProducto />} />
            <Route path="/admin/editar/:id" element={<FormEditarProducto />} />
            <Route path="/admin/proveedores" element={<Proveedores />} />

            <Route path="*" element={<NotFound />} />
            
        </Routes>

        <Footer /> 
    </Router>
  );
}

export default App;
