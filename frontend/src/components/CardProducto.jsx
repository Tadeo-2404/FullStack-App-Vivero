function CardProducto({ datos }){
    return(
        <div className="producto">
            <h2 className="producto__nombre">{datos.nombre}</h2>
            <p className="producto__descripcion">{datos.descripcion}</p>
            <p className="producto__precio"><b>Precio:</b> ${datos.precio}</p>
            <p className="producto__cantidad"><b>Cantidad:</b> {datos.cantidad} piezas</p>
        </div>
    )
}

export default CardProducto;