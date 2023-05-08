import { Link } from "react-router-dom";
import GaleriaProductos from "../components/GaleriaProductos";

function Inicio(){
    return(
        <main className="main">
            <article className="galeria">
                <h2 className="titulo galeria__titulo">Productos</h2>

                <GaleriaProductos url={`http://localhost:3000/api/productos?limite=4`} />

                <div className="contenedor galeria__botones">
                    <Link to={"/productos"}>Ver más</Link>
                </div>
            </article>

            <div className="contenedor enlaces">
                <Link className="boton" to="/proveedores">Lista de proveedores</Link>
                <Link className="boton" to="/compras">Lista de compras</Link>
                <Link className="boton" to="/ventas">Lista de ventas</Link>
            </div>
        </main>
    )
}

export default Inicio;