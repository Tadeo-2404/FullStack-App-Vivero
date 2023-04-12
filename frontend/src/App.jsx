import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

import Inicio from './pages/Inicio';
import FormPublicarProducto from './pages/FormPublicarProducto';
import FormEditarProducto from './pages/FormEditarProducto';
import NotFound from './pages/NotFound';

import Navbar from './components/Navbar';

function App(){
    return(
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/admin/publicar" element={<FormPublicarProducto />} />
                <Route path="/admin/editar/:id" element={<FormEditarProducto />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App;