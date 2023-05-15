import { useEffect, useState } from "react";

function Ventas(){
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        const obtenerVentas = async () => {
            // Se obtienen las ventas (fecha, total)
            let res = await fetch("http://localhost:3000/api/ventas");
            let datos = await res.json();
            
            datos = datos.map(async venta => {
                // Por cada venta, obtenemos los datos de venta-producto (id, id_venta, id_producto, cantidad, subtotal)
                let res = await fetch(`http://localhost:3000/api/venta-producto?id_venta=${venta.id}`);
                let datos = await res.json();

                datos = datos.map(async datoVP => {
                    // Por cada venta-producto se obtiene la información del producto y se agrega (nombre, descripcion, precio)
                    let resProducto = await fetch(`http://localhost:3000/api/productos?id=${datoVP.id_producto}`).then(response => response.json());

                    let nombre = resProducto[0]["nombre"];
                    let descripcion = resProducto[0]["descripcion"];
                    let precio_venta = resProducto[0]["precio_venta"];

                    return {
                        ...datoVP,
                        nombre,
                        descripcion,
                        precio_venta
                    }
                })
                datos = await Promise.all(datos);

                return { ...venta, productos: datos }
            })
            datos = await Promise.all(datos);
            datos.sort((a, b) => a.id - b.id);

            setVentas(datos);
        }
        obtenerVentas();
    }, [])
    
    return(
        <main className="contenedor main">
            <h1 className="titulo">Ventas</h1>

            <div className="ventas">
                {
                    ventas.length > 0 ? (
                        ventas.map(venta => (
                            <div className="venta" key={venta.id}>
                                <h2>Venta #{venta.id}</h2>
                                <p><b>Fecha:</b> {venta.fecha}</p>
                                <p><b>Total:</b> ${venta.total}</p>
                                <div className="venta__productos">
                                    {
                                        venta.productos.map(producto => (
                                            <div className="venta__producto contenedor" key={producto.id}>
                                                <h3>{producto.nombre}</h3>
                                                <p><b>Descripcion:</b> {producto.descripcion}</p>
                                                {/* Aquí se calcula el precio manualmente porque puede ser que el dueño haya editado el precio de venta recientemente */}
                                                <p><b>Precio de venta:</b> ${producto.subtotal / producto.cantidad}</p>
                                                <p><b>Cantidad:</b> {producto.cantidad}</p>
                                                <p><b>Subtotal:</b> {producto.subtotal}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay ventas para mostrar</p>
                    )
                }
            </div>
        </main>
    )
}

export default Ventas;