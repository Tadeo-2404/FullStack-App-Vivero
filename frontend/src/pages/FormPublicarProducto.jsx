import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function FormPublicarProducto(){
    const navigate = useNavigate(); //navigate para redireccionar al usuario
    const [producto, setProducto] = useState({nombre: "", descripcion: "", precio_compra: 0, precio_venta: 0}); //inicializar producto
    const [cargando, setCargando] = useState(true);
    const [proveedores, setProveedores] = useState(null);

    const selectProveedor = useRef();

    // Carga los proveedores para el select
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

        // Al objeto que se pasará al body se le agrega el id del proveedor
        let body = {
            ...producto,
            precio_compra: parseInt(producto.precio_compra),
            precio_venta: parseInt(producto.precio_venta),
            id_proveedor: parseInt(selectProveedor.current.value)
        }

        // Hacer fetch con metodo post para agregar producto
        fetch(`http://localhost:3000/api/productos`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            // Verificar si hay un error
            if(!res.msg){
                console.log("Producto Agregado", res);
                toast.success("Producto agregado");
                navigate("/");
            } else {
                // console.log(res.msg);
                toast.error(res.msg);
            }
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
                    <select className="form__input" name="proveedores" id="proveedores" ref={selectProveedor} required>
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
                    <label htmlFor="precio_compra">Precio compra</label>
                    <input
                        name="precio_compra"
                        id="precio_compra"
                        className="form__input"
                        type="number"
                        onInput={handleInput}
                        value={producto.precio_compra}
                        required
                    />
                </div>

                <div className="form__apartado">
                    <label htmlFor="precio_venta">Precio venta</label>
                    <input
                        name="precio_venta"
                        id="precio_venta"
                        className="form__input"
                        type="number"
                        onInput={handleInput}
                        value={producto.precio_venta}
                        required
                    />
                </div>

                <input type="submit" className="form__input form__input--boton boton" value="Publicar" />

            </form>
        </main>
    )
}

export default FormPublicarProducto;