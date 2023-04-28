import Card from "./CardProducto";
import useProductos from "../hooks/useProductos";

function GaleriaProductos({ url }){
    const [ cargando, productos ] = useProductos(url);
    
    return(
        <div className="contenedor productos">
            {
                productos ? (
                    productos.map(producto => (
                        <Card key={producto.id} datos={producto} />
                    ))
                ) : (
                    <p>No hay productos para mostrar</p>
                )
            }
        </div>
    )
}

export default GaleriaProductos;