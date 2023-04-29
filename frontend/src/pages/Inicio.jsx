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

            <div className="contenedor">
                <Link to="/admin/proveedores">Lista de proveedores</Link><br />
                <Link to="/admin/ventas">Lista de ventas</Link><br />
                <Link to="/admin/compras">Lista de compras</Link>
            </div>
        </main>
    )
}

export default Inicio;