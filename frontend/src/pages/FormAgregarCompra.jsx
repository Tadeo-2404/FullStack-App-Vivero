import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormAgregarCompra(){
    let navigate = useNavigate();
    const [proveedores, setProveedores] = useState(null);
    const [proveedor, setProveedor] = useState(null);
    const [productos, setProductos] = useState(null);
    const [productosFiltrados, setProductosFiltrados] = useState(null);
    const [total, setTotal] = useState(0);
    let form = useRef();

    useEffect(() => {
        // Se obtienen todos los proveedores para mostrar en el select
        fetch(`http://localhost:3000/api/proveedores`)
        .then(res => res.json())
        .then(res => setProveedores(res))
    }, [])

    const cambiarProveedor = (e) => {
        const idProveedor = e.target.value;
        setProveedor(idProveedor);

        if(idProveedor == ""){
            setProductos(null);
            return;
        }

        // Obtener todos los productos de ese proveedor para mostrar en el formulario
        fetch(`http://localhost:3000/api/productos?id_proveedor=${idProveedor}`)
        .then(res => res.json())
        .then(res => setProductos(res))
    }

    const filtrarProductos = () => {
        let formData = new FormData(form.current);
        // Se obtiene un arreglo con los id de los productos seleccionados
        let infoProductos = Object.fromEntries(formData.entries());
        
        let filtrados = [];
        for(let [id, cantidad] of Object.entries(infoProductos)){
            // Si la cantidad es inválida, no va a agregar la venta
            if(cantidad <= 0) continue;
            // Filtramos solo los productos seleccionados
            let producto = productos.find(producto => producto.id == id);
            if(producto){
                // Se crea este objeto para no modificar la cantidad del producto original
                let prod = { ...producto }
                // Les ponemos la cantidad vendida
                prod.cantidad = parseInt(cantidad);
                filtrados.push(prod);
            }
        }
        
        setProductosFiltrados(filtrados);

        // Obtener el total para mostrar en la página
        let total = 0;
        filtrados.forEach(filtrado => {
            total += filtrado.cantidad * filtrado.precio_compra;
        })
        setTotal(total);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        console.log("filtrados:", productosFiltrados);

        // Si no se selecciono ningún producto, no se agrega la venta
        if(productosFiltrados.length <= 0) return;
        
        // Se hace una petición para subir la venta
        let res = await fetch(`http://localhost:3000/api/compras`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "id_proveedor": parseInt(proveedor),
                "productos": productosFiltrados
            })
        })
        let data = await res.json();
        console.log("Compra agregada", data);
        navigate("/");
    }

    const handleInput = e => {
        filtrarProductos();
    }

    return(
        <main className="main">
            <h1 className="titulo">Agregar compra</h1>
            <form action="" className="form contenedor" ref={form} onSubmit={handleSubmit}>

                <div className="form__apartado">
                    <label htmlFor="proveedor">Proveedor</label>
                    <select className="form__input" name="proveedores" id="proveedores" onInput={cambiarProveedor} required>
                        <option value="">Elige un proveedor</option>
                        {
                            proveedores && proveedores.map(p => (
                                <option value={p.id} key={p.id}>{p.nombre}</option>
                            ))
                        }
                    </select>
                </div>

                {/* Obtener todos los productos y recorrerlos para crear su estructura */}
                {
                    productos && productos.map(producto => (
                        <div className="form__apartado" key={producto.id}>
                            <label htmlFor={`producto-${producto.id}`}>{producto.nombre} (${producto.precio_compra})</label>
                            <input
                                name={producto.id}
                                id={`producto-${producto.id}`}
                                className="form__input"
                                type="number"
                                min={0}
                                defaultValue={0}
                                onInput={handleInput}
                                // value={producto.id}
                            />
                        </div>
                    ))
                }

                {
                    proveedor && <h3>Total: ${total}</h3>
                }

                <input type="submit" className="form__input form__input--boton boton" value="Agregar" />

            </form>
        </main>
    )
}

export default FormAgregarCompra;