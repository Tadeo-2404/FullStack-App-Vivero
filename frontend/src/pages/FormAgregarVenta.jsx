import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function FormAgregarVenta(){
    let navigate = useNavigate();
    const [productos, setProductos] = useState(null);
    const [productosFiltrados, setProductosFiltrados] = useState(null);
    const [total, setTotal] = useState(0);
    let form = useRef();

    useEffect(() => {
        // Obtener todos los productos para mostrar en el formulario
        fetch("http://localhost:3000/api/productos")
        .then(res => res.json())
        .then(res => setProductos(res))
    }, [])

    // Esto se llama cada que se cambia un input cantidad
    // Al guardar los filtrados podemos obtener el total y además utilizarlo en el submit
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
            total += filtrado.cantidad * filtrado.precio;
        })
        setTotal(total);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        console.log("filtrados:", productosFiltrados);

        // Si no se selecciono ningún producto, no se agrega la venta
        if(productosFiltrados.length <= 0) return;
        
        // Calculamos los datos para la llave "venta"
        let fecha = new Date();
        let dia = fecha.getDate().toString().padStart(2, "0");
        let mes = (fecha.getMonth() + 1).toString().padStart(2, 0);

        // Se hace una petición para subir la venta
        let res = await fetch(`http://localhost:3000/api/ventas`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "venta": {
                    total, // Desde useState
                    fecha: `${dia}-${mes}-${fecha.getFullYear()}` // DD-MM-YYYY
                },
                "productos": productosFiltrados                
            })
        })
        let data = await res.json();
        if(!data.msg){
            console.log("Venta agregada", data);
            navigate("/");
        } else {
            toast.error(data.msg);
        }
    }

    const handleInput = e => {
        filtrarProductos();
    }

    if(!productos) return <h2 className="contenedor titulo">Sin productos</h2>

    return(
        <main className="main">
            <h1 className="titulo">Agregar venta</h1>
            <form action="" className="form contenedor" ref={form} onSubmit={handleSubmit}>

                {/* Obtener todos los productos y recorrerlos para crear su estructura */}
                {
                    productos.map(producto => (
                        <div className="form__apartado" key={producto.id}>
                            <label htmlFor={`producto-${producto.id}`}>{producto.nombre} (${producto.precio}) - Cantidad: {producto.cantidad}</label>
                            <input
                                name={producto.id}
                                id={`producto-${producto.id}`}
                                className="form__input"
                                type="number"
                                defaultValue={0}
                                min={0}
                                max={producto.cantidad}
                                onInput={handleInput}
                                // value={producto.id}
                            />
                            {/* <input
                                name={producto.id}
                                id={`producto-${producto.id}`}
                                className="form__input"
                                type="checkbox"
                                // onInput={handleInput}
                                // value={producto.id}
                            /> */}
                        </div>
                    ))
                }

                <h3>Total: ${total}</h3>

                <input type="submit" className="form__input form__input--boton boton" value="Agregar" />

            </form>
        </main>
    )
}

export default FormAgregarVenta;