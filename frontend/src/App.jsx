import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

import Inicio from './pages/Inicio';
import NotFound from './pages/NotFound';
import FormPublicarProducto from './pages/admin/FormPublicarProducto';
import FormEditarProducto from './pages/admin/FormEditarProducto';

import Navbar from './components/Navbar';

function App(){
    return(
        <Router>
            <Navbar />
            <Routes>
                {/* CLIENTES */}
                {/* <Route path="/registro" element={<Registro />} /> */}
                {/* <Route path="/inicio-sesion" element={<InicioSesion />} /> */}
                <Route path="/" element={<Inicio />} />
                {/* <Route path="/sucursales" element={<Sucursales />} /> */}

                {/* ADMIN */}
                {/* <Route path="/admin/inicio-sesion" element={<InicioSesionAdmin />} /> */}
                <Route path="/admin/publicar" element={<FormPublicarProducto />} />
                <Route path="/admin/editar/:id" element={<FormEditarProducto />} />
                {/* <Route path="/admin/proveedores" element={<Proveedores />} /> */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App;