import Card from "./CardArticulo";
import useArticulos from "../../hooks/useArticulos";

function GaleriaArticulos({ opciones }){
    const { articulos } = useArticulos(opciones);
    
    return(
        <div className="contenedor articulos">
            {
                articulos && articulos.map(articulo => (
                    <Card key={articulo.id} datos={articulo} />
                ))
            }
        </div>
    )
}

export default GaleriaArticulos;