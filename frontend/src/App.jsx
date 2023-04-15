import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Inicio from "./pages/Inicio";
import NotFound from "./pages/NotFound";
import FormPublicarProducto from "./pages/admin/FormPublicarProducto";
import FormEditarProducto from "./pages/admin/FormEditarProducto";
import TemplateLayoutCliente from "./layout/TemplateLayoutCliente";
import TemplateLayoutAdmin from "./layout/TemplateLayoutAdmin";
import IniciarSesion from "./pages/cliente/IniciarSesion";
import Sucursales from "./pages/cliente/Sucursales";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/cliente" element={<TemplateLayoutCliente />}>
            {/* CLIENTES */}
            <Route index element={<Inicio />} />
            <Route path="/registrarse" element={<Registro />} />
            <Route path="/iniciar_sesion" element={<IniciarSesion />} />
            <Route path="/sucursales" element={<Sucursales />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/admin" element={<TemplateLayoutAdmin />}>
            {/* ADMIN */}
            {/* <Route path="/admin/inicio-sesion" element={<InicioSesionAdmin />} /> */}
            <Route index element={<Inicio />} />
            <Route path="/admin/publicar" element={<FormPublicarProducto />} />
            <Route path="/admin/editar/:id" element={<FormEditarProducto />} />
            {/* <Route path="/admin/proveedores" element={<Proveedores />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
