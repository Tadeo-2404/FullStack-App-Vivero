import { Link } from "react-router-dom";

function Inicio(){
    return(
        <>
            <h1>Página de inicio</h1>
            <h2>GALERIA DE PRODUCTOS</h2>
            <h2>Rutas de prueba para ver el funcionamiento</h2>
            <Link to="/admin/editar/1">Prueba ruta editar producto 1 (admin)</Link>
            <br />
            <Link to="/sucursales">Sucursales</Link>
            <br />
            <Link to="/admin/proveedores">Proveedores (admin)</Link>
        </>
    )
}

export default Inicio;