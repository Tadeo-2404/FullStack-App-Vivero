import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormAgregarCompra(){
    let navigate = useNavigate();
    const [productos, setProductos] = useState(null);
    const [proveedores, setProveedores] = useState(null);
    const selectProveedor = useRef();

    //! ONINPUT SELECTPROVEEDOR, HACER PETICION A PROVEECORES?ID=ID Y MOSTRAR LOS PRODUCTOS QUE VENDE

    useEffect(() => {
        // Obtener todos los productos para mostrar en el formulario
        fetch("http://localhost:3000/api/productos")
        .then(res => res.json())
        .then(res => setProductos(res))

        fetch("http://localhost:3000/api/proveedores")
        .then(res => res.json())
        .then(res => setProveedores(res))
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();

        let idProveedor = selectProveedor.current.value;

        let formData = new FormData(e.target);
        // Se obtiene un arreglo con los id de los productos seleccionados
        let infoProductos = Object.fromEntries(formData.entries());
        
        let productosFiltrados = [];
        for(let [id, cantidad] of Object.entries(infoProductos)){
            // Si la cantidad es inválida, no va a agregar la compra
            if(cantidad <= 0) continue;
            // Filtramos solo los productos seleccionados
            let producto = productos.find(producto => producto.id == id);
            if(producto){
                // Les ponemos la cantidad comprada
                producto.cantidad = parseInt(cantidad);
                productosFiltrados.push(producto);
            }
        }

        // console.log({ idProveedor, productos: productosFiltrados });
        
        // Se hace una petición para subir la venta
        let res = await fetch(`http://localhost:3000/api/compras`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "id_proveedor": idProveedor,
                "productos": productosFiltrados                
            })
        })
        let data = await res.json();
        console.log("Compra agregada", data);
        navigate("/");
    }

    if(!proveedores) return <h2 className="contenedor titulo">Sin proveedores</h2>
    if(!productos) return <h2 className="contenedor titulo">Sin productos</h2>

    return(
        <main className="main">
            <h1 className="titulo">Agregar compra</h1>
            <form action="" className="form contenedor" onSubmit={handleSubmit}>

                <select name="proveedores" id="proveedores" ref={selectProveedor} required>
                    <option value="">Elige un proveedor</option>
                    {
                        proveedores.map(p => (
                            <option value={p.id} key={p.id}>{p.nombre}</option>
                        ))
                    }
                </select>

                {/* Obtener todos los productos y recorrerlos para crear su estructura */}
                {
                    productos.map(producto => (
                        <div className="form__apartado" key={producto.id}>
                            <label htmlFor={`producto-${producto.id}`}>{producto.nombre}</label>
                            <input
                                name={producto.id}
                                id={`producto-${producto.id}`}
                                className="form__input"
                                type="number"
                                min={0}
                                defaultValue={0}
                                // onInput={handleInput}
                                // value={producto.id}
                            />
                        </div>
                    ))
                }

                <input type="submit" className="form__input form__input--boton boton" value="Agregar" />

            </form>
        </main>
    )
}

export default FormAgregarCompra;