import { useParams } from "react-router-dom";

function FormEditarProducto(){
    const { id } = useParams();
    return(
        <h1>Formulario editar producto: {id}</h1>
    )
}

export default FormEditarProducto;