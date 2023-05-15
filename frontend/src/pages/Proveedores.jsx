import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Proveedores(){
    const [proveedores, setProveedores] = useState([]);
    
    const obtenerProveedores = async () => {
        let res = await fetch("http://localhost:3000/api/proveedores");
        let data = await res.json();

        setProveedores(data);
    }

    useEffect(() => {
        obtenerProveedores();
    }, [])

    const handleEliminar = async (idProveedor) => {
        let res = await fetch(`http://localhost:3000/api/proveedores?id=${idProveedor}`, {
            method: "DELETE"
        });
        let data = await res.json();

        console.log(data);

        obtenerProveedores();
    }

    return(
        <main className="main">
            <h1 className="titulo">Proveedores</h1>
            <div className="contenedor proveedores">
                {
                    proveedores.length > 0 ? (
                        proveedores.map(proveedor => (
                            <div className="proveedor" key={proveedor.id}>
                                <div className="proveedor__contenido">
                                    <h2>ID: {proveedor.id} - {proveedor.nombre}</h2>
                                    <p><b>Número:</b> {proveedor.telefono}</p>
                                    <p><b>RFC:</b> {proveedor.rfc}</p>
                                    <p><b>Dirección:</b> {proveedor.direccion}</p>
                                </div>
                                <div className="botones">
                                    <Link className="boton" to={`/editar-proveedor/${proveedor.id}`}>Editar</Link>
                                    <button className="boton boton--rojo" onClick={() => handleEliminar(proveedor.id)}>Eliminar</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay proveedores para mostrar</p>
                    )
                }
            </div>
        </main>
    )
}

export default Proveedores;