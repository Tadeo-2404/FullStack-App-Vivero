import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductos from "../../hooks/useProductos";

function FormEditarProducto(){
    const navigate = useNavigate();

    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    const opciones = {
        url: `http://localhost:3000/api/productos/${id}`,
        limite: 1
    }
    const [ cargando, datos ] = useProductos(opciones);

    // Si llegan datos, se pasa a producto
    useEffect(() => {
        if(datos) setProducto(datos);
    }, [datos])

    const handleSubmit = e => {
        e.preventDefault();

        // Hacer fetch con method put para actualizar los datos
        fetch(`http://localhost:3000/api/productos/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(producto)
        })
        .then(res => res.json())
        .then(res => {
            console.log("Producto actualizado", res);
            navigate("/");
        })
    }

    const handleInput = e => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    }

    if(cargando) return <h1 className="titulo">Cargando...</h1>
    if(!producto) return <h1 className="titulo">No hay producto</h1>

    return(
        <main className="main">
            <h1 className="titulo">Formulario editar producto: #{id}</h1>
            <form action="" className="form contenedor" onSubmit={handleSubmit}>

                <div className="form__apartado">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        name="nombre"
                        id="nombre"
                        className="form__input"
                        type="text"
                        onInput={handleInput}
                        value={producto.nombre}
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
                        onInput={handleInput}
                        value={producto.descripcion}
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
                        onInput={handleInput}
                        value={producto.precio}
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
                        onInput={handleInput}
                        value={producto.cantidad}
                        required
                    />
                </div>

                <input type="submit" className="form__input form__input--boton boton" value="Editar" />

            </form>
        </main>
    )
}

export default FormEditarProducto;