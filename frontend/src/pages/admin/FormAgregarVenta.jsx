import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormAgregarVenta(){
    let navigate = useNavigate();
    const [productos, setProductos] = useState(null);

    useEffect(() => {
        // Obtener todos los productos para mostrar en el formulario
        fetch("http://localhost:3000/api/productos")
        .then(res => res.json())
        .then(res => setProductos(res))
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();
        let formData = new FormData(e.target);
        // Se obtiene un arreglo con los id de los productos seleccionados
        let infoProductos = Object.fromEntries(formData.entries());
        
        let productosFiltrados = [];
        for(let [id, cantidad] of Object.entries(infoProductos)){
            // Si la cantidad es inválida, no va a agregar la venta
            if(cantidad <= 0) continue;
            // Filtramos solo los productos seleccionados
            let producto = productos.find(producto => producto.id == id);
            if(producto){
                // Les ponemos la cantidad vendida
                producto.cantidad = cantidad;
                productosFiltrados.push(producto);
            }
        }

        console.log("filtrados:", productosFiltrados);
        
        // Calculamos los datos para la llave "venta"
        let total = 0;
        productosFiltrados.forEach(producto => {
            total += producto.precio;
        })
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
                    total,
                    fecha: `${dia}-${mes}-${fecha.getFullYear()}` // DD-MM-YYYY
                },
                "productos": productosFiltrados                
            })
        })
        let data = await res.json();
        console.log("Venta agregada", data);
        navigate("/");
    }

    if(!productos) return <h2 className="contenedor titulo">Sin productos</h2>

    return(
        <main className="main">
            <h1 className="titulo">Agregar venta</h1>
            <form action="" className="form contenedor" onSubmit={handleSubmit}>

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

                <input type="submit" className="form__input form__input--boton boton" value="Agregar" />

            </form>
        </main>
    )
}

export default FormAgregarVenta;