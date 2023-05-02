import { useLocation } from "react-router-dom";
import GaleriaProductos from "../components/GaleriaProductos";

function Productos(){
    let location = useLocation();
    
    const urlBackend = 'http://localhost:3000/api'; //url del backend
    const query = location.pathname + location.search;

    return(
        <main className="contenedor main">
            <h1 className="titulo">Productos</h1>

            <GaleriaProductos url={`${urlBackend}${query}`} />
        </main>
    )
}

export default Productos;