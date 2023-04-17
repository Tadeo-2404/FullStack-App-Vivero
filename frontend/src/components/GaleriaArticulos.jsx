import Card from "./CardArticulo";
import useArticulos from "../../hooks/useArticulos";

function GaleriaArticulos({ opciones }){
    const [ cargando, articulos ] = useArticulos(opciones);
    
    return(
        <div className="contenedor articulos">
            {
                articulos ? (
                    articulos.map(articulo => (
                        <Card key={articulo.id} datos={articulo} />
                    ))
                ) : (
                    <p>No hay artículos para mostrar</p>
                )
            }
        </div>
    )
}

export default GaleriaArticulos;