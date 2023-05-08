import { useState } from 'react';
import { Link } from 'react-router-dom';

function CardProducto({ datos }){
    const [estado, setEstado] = useState(1);

    const handleEliminar = async (idProducto) => {
        let res = await fetch(`http://localhost:3000/api/productos?id=${idProducto}`, {
            method: "DELETE"
        });
        let data = await res.json();

        console.log(data);

        // Lo borra del frontend (para no tener que recargar la página)
        setEstado(0);
    }

    return(
        estado == 1 && (
            <div className="producto">
                <div className="producto__contenido">
                    <h2 className="producto__nombre">{datos.nombre}</h2>
                    <p><b>ID del Proveedor: </b>{datos.id_proveedor}</p>
                    <p className="producto__descripcion"><b>Descripción</b><br />{datos.descripcion}</p>
                    <p className="producto__precio"><b>Precio:</b> ${datos.precio}</p>
                    <p className="producto__cantidad"><b>Cantidad:</b> {datos.cantidad} unidades</p>
                </div>
                <div className="botones">
                    <Link className="boton" to={`/editar-producto/${datos.id}`}>Editar</Link>
                    <button className="boton boton--rojo" onClick={() => handleEliminar(datos.id)}>Eliminar</button>
                </div>
            </div>
        )
    )
}

export default CardProducto;