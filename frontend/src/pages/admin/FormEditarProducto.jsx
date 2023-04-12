import { useParams } from "react-router-dom";

function FormEditarProducto(){
    const { id } = useParams();

    return(
        // En inputs, cargar toda la información (fetch del producto)
        // Al darle a enviar, hacer una petición para actualizar los datos
        <div className="contenedor">
            <h1 class="titulo">Formulario editar producto: #{id}</h1>
            <form action="" className="form">

                <div className="form__apartado">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        name="nombre"
                        id="nombre"
                        className="form__input"
                        type="text"
                        // onInput={handleInput}
                        // value={datos.nombre}
                        required
                    />
                </div>

                <div className="form__apartado">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        name="descripcion"
                        id="descripcion"
                        className="form__input"
                        cols="30"
                        rows="10"
                        // onInput={handleInput}
                        // value={datos.descripcion}
                        required>
                    </textarea>
                </div>

                <div className="form__apartado">
                    <label htmlFor="precio">Precio</label>
                    <input
                        name="precio"
                        id="precio"
                        className="form__input"
                        type="number"
                        // onInput={handleInput}
                        // value={datos.precio}
                        required
                    />
                </div>

                <div className="form__apartado">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        name="cantidad"
                        id="cantidad"
                        className="form__input"
                        type="number"
                        // onInput={handleInput}
                        // value={datos.cantidad}
                        required
                    />
                </div>

                <input type="submit" className="form__input form__input--boton boton" value="Editar" />

            </form>
        </div>
    )
}

export default FormEditarProducto;