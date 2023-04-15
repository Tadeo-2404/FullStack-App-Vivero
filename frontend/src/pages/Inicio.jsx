import { Link } from "react-router-dom";
import GaleriaProductos from "../components/GaleriaProductos";

function Inicio(){
    return(
        <main className="main">
            <h1 className="titulo">Productos</h1>
            <GaleriaProductos />
            <div className="contenedor">
                <h2 className="titulo">Rutas de prueba para ver el funcionamiento</h2>
                <Link to="/admin/editar/1">Prueba ruta editar producto 1 (admin)</Link>
                <br />
                <Link to="/sucursales">Sucursales</Link>
                <br />
                <Link to="/admin/proveedores">Proveedores (admin)</Link>
            </div>
        </main>
    )
}

export default Inicio;