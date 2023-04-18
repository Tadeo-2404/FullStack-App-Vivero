import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useArticulos from "../../hooks/useArticulos";

function FormEditarArticulo(){
    const navigate = useNavigate();

    const { tipo, id } = useParams(); // tipo -> productos - sustratos
    const [articulo, setArticulo] = useState(null);

    const opciones = {
        url: `http://localhost:3000/api/${tipo}/${id}`,
        limite: 1
    }
    const [ cargando, datos ] = useArticulos(opciones);

    // Si llegan datos, se pasa a articulo
    useEffect(() => {
        if(datos) setArticulo(datos);
    }, [datos])

    const handleSubmit = e => {
        e.preventDefault();

        // Hacer fetch con method put para actualizar los datos
        fetch(`http://localhost:3000/api/${tipo}/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(articulo)
        })
        .then(res => res.json())
        .then(res => {
            console.log("Producto actualizado", res);
            navigate("/");
        })
    }

    const handleInput = e => {
        setArticulo({
            ...articulo,
            [e.target.name]: e.target.value
        });
    }

    if(cargando) return <h1 className="titulo">Cargando...</h1>
    if(!articulo) return <h1 className="titulo">No hay articulo</h1>

    return(
        <main className="main">
            <h1 className="titulo">Formulario editar {tipo == "productos" ? "producto" : "sustrato"}: #{id}</h1>
            <form action="" className="form contenedor" onSubmit={handleSubmit}>

                <div className="form__apartado">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        name="nombre"
                        id="nombre"
                        className="form__input"
                        type="text"
                        onInput={handleInput}
                        value={articulo.nombre}
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
                        value={articulo.descripcion}
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
                        value={articulo.precio}
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
                        value={articulo.cantidad}
                        required
                    />
                </div>

                <input type="submit" className="form__input form__input--boton boton" value="Editar" />

            </form>
        </main>
    )
}

export default FormEditarArticulo;