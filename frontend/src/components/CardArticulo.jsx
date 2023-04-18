function CardArticulo({ datos }){
    return(
        <div className="articulo">
            <h2 className="articulo__nombre">{datos.nombre}</h2>
            <p className="articulo__descripcion">{datos.descripcion}</p>
            <p className="articulo__precio"><b>Precio:</b> ${datos.precio}</p>
            <p className="articulo__cantidad"><b>Cantidad:</b> {datos.cantidad} piezas</p>
        </div>
    )
}

export default CardArticulo;