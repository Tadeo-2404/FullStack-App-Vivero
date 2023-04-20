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
import Proveedores from "./pages/admin/Proveedores";

function App() {
  return (
    <Router>
        <Navbar />
        
        <Routes>

            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />

            {/* ADMIN */}
            <Route path="/admin/iniciar-sesion" element={<InicioSesionAdmin />} />
            <Route path="/admin/publicar" element={<FormPublicarProducto />} />
            <Route path="/admin/editar-producto/:id" element={<FormEditarProducto />} />
            <Route path="/admin/proveedores" element={<Proveedores />} />

            <Route path="*" element={<NotFound />} />
            
        </Routes>

        <Footer /> 
    </Router>
  );
}

export default App;
