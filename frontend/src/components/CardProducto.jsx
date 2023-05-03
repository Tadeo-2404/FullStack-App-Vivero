import { Link } from 'react-router-dom';

function CardProducto({ datos }){
    return(
        <div className="producto">
            <Link to={`/editar-producto/${datos.id}`}>Editar</Link>
            <h2 className="producto__nombre">{datos.nombre}</h2>
            <p><b>Proveedor: </b>{datos.id_proveedor}</p>
            <p className="producto__descripcion">{datos.descripcion}</p>
            <p className="producto__precio"><b>Precio:</b> ${datos.precio}</p>
            <p className="producto__cantidad"><b>Cantidad:</b> {datos.cantidad} piezas</p>
        </div>
    )
}

export default CardProducto;