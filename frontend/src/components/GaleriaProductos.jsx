import CardProducto from "./CardProducto";

function GaleriaProductos({ productos=[] }){
    return(
        <div className="contenedor productos">
            <CardProducto />
            <CardProducto />
            <CardProducto />
            <CardProducto />
        </div>
    )
}

export default GaleriaProductos;