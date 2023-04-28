import { Link } from "react-router-dom";
import GaleriaProductos from "../components/GaleriaProductos";

function Inicio(){
    return(
        <main className="main">
            <article className="galeria">
                <h2 className="titulo galeria__titulo">Productos</h2>

                <GaleriaProductos opciones={{
                    url: "http://localhost:3000/api/productos",
                    limite: 5
                }} />

                <div className="contenedor galeria__botones">
                    <Link to={"/productos"}>Ver más</Link>
                </div>
            </article>

            <div className="contenedor">
                <h2 className="titulo">Proveedores</h2>
                <Link to="/admin/proveedores">Lista de proveedores</Link>
                <h2 className="titulo">Ventas</h2>
                <Link to="/admin/ventas">Lista de ventas</Link>
            </div>
        </main>
    )
}

export default Inicio;