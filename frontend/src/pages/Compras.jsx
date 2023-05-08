import { useEffect, useState } from "react";

function Compras(){
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        const obtenerCompras = async () => {
            // Se obtienen las compras (id_proveedor, fecha, total)
            let res = await fetch("http://localhost:3000/api/compras");
            let datos = await res.json();
            
            datos = datos.map(async compra => {
                // Por cada compra, obtenemos los datos de compra-producto (id, id_compra, id_producto, cantidad, subtotal)
                let res = await fetch(`http://localhost:3000/api/compra-producto?id_compra=${compra.id}`);
                let datos = await res.json();

                datos = datos.map(async datoCP => {
                    // Por cada compra-producto se obtiene la información del producto y se agrega (nombre, descripcion, precio)
                    let resProducto = await fetch(`http://localhost:3000/api/productos?id=${datoCP.id_producto}`)
                    let datosProducto = await resProducto.json();

                    let nombre = datosProducto[0]["nombre"];
                    let descripcion = datosProducto[0]["descripcion"];
                    let precio = datosProducto[0]["precio"];

                    return {
                        ...datoCP,
                        nombre,
                        descripcion,
                        precio
                    }
                })
                datos = await Promise.all(datos);

                return { ...compra, productos: datos }
            })
            datos = await Promise.all(datos);
            datos.sort((a, b) => a.id - b.id);

            setCompras(datos);
        }
        obtenerCompras();
    }, [])
    
    return(
        <main className="contenedor main">
            <h1 className="titulo">Compras</h1>

            <div className="compras">
                {
                    compras ? (
                        compras.map(compra => (
                            <div className="compra" key={compra.id}>
                                <h2>Compra #{compra.id}</h2>
                                <p><b>Proveedor: </b>{compra.id_proveedor}</p>
                                <p><b>Fecha: </b>{compra.fecha}</p>
                                <p><b>Total: </b>${compra.total}</p>
                                <div className="compra__productos">
                                    {
                                        compra.productos.map(producto => (
                                            <div className="compra__producto contenedor" key={producto.id}>
                                                <h3>{producto.nombre}</h3>
                                                <p><b>Descripcion: </b>{producto.descripcion}</p>
                                                <p><b>Precio: </b>{producto.precio}</p>
                                                <p><b>Cantidad: </b>{producto.cantidad}</p>
                                                <p><b>Subtotal: </b>${producto.subtotal}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay compras para mostrar</p>
                    )
                }
            </div>
        </main>
    )
}

export default Compras;