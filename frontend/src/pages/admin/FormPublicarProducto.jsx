import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPublicarProducto(){
    const navigate = useNavigate(); //navigate para redireccionar al usuario
    const [producto, setProducto] = useState({nombre: "", descripcion: "", precio: 0, cantidad: 0}); //inicializar producto
    const [cargando, setCargando] = useState(true);
    const [proveedores, setProveedores] = useState(null);

    useEffect(() => {
        setCargando(true);
        fetch("http://localhost:3000/api/proveedores")
        .then(res => res.json())
        .then(res => {
            setProveedores(res);
            setCargando(false);
        })
    }, [])

    const handleSubmit = e => {
        e.preventDefault();

        // Hacer fetch con metodo post para agregar producto
        fetch(`http://localhost:3000/api/productos`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(producto)
        })
        .then(res => res.json())
        .then(res => {
            console.log("Producto Agregado", res);
            navigate("/");
        })
    }

    const handleInput = e => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    }

    if(cargando) return <h2 className="contenedor titulo">Cargando...</h2>

    return(
        <main className="main">
            <h1 className="titulo">Registrar producto</h1>
            <form action="" className="form contenedor" onSubmit={handleSubmit}>

                <div className="form__apartado">
                    <label htmlFor="proveedor">Proveedor</label>
                    <select name="proveedores" id="proveedores" required>
                        <option value="">Elige un proveedor</option>
                        {
                            proveedores.map(p => (
                                <option value={p.id} key={p.id}>{p.nombre}</option>
                            ))
                        }
                    </select>
                </div>

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

                <input type="submit" className="form__input form__input--boton boton" value="Publicar" />

            </form>
        </main>
    )
}

export default FormPublicarProducto;