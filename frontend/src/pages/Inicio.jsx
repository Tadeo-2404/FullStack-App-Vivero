import { Link } from "react-router-dom";

function Inicio(){
    return(
        <>
            <h1>Página de inicio</h1>
            <h2>GALERIA DE PRODUCTOS</h2>
            <Link to="/admin/editar/1">Prueba ruta editar producto 1</Link>
        </>
    )
}

export default Inicio;