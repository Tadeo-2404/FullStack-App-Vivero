import Card from "./CardProducto";
import useProductos from "../hooks/useProductos";

function GaleriaProductos({ opciones }){
    const [ cargando, productos ] = useProductos(opciones);
    
    return(
        <div className="contenedor productos">
            {
                productos ? (
                    productos.map(producto => (
                        <Card key={producto.id} datos={producto} />
                    ))
                ) : (
                    <p>No hay artículos para mostrar</p>
                )
            }
        </div>
    )
}

export default GaleriaProductos;