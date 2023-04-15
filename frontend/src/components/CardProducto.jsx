function CardProducto(){
    return(
        <div className="producto">
            <h2 className="producto__nombre">Nombre del producto</h2>
            <p className="producto__descripcion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, soluta autem accusantium excepturi, repellat, explicabo ullam assumenda maiores eligendi incidunt fuga minima est rem temporibus nulla quos nostrum odit nihil?</p>
            <p className="producto__precio"><b>Precio:</b>$5000</p>
            <p className="producto__cantidad"><b>Cantidad:</b>3 piezas</p>
        </div>
    )
}

export default CardProducto;