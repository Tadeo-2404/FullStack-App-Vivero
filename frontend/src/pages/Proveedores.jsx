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
                    proveedores.map(proveedor => (
                        <div className="proveedor" key={proveedor.id}>
                            <Link to={`/editar-proveedor/${proveedor.id}`}>Editar</Link>
                            <button onClick={() => handleEliminar(proveedor.id)}>Eliminar</button>
                            <h2>{proveedor.nombre}</h2>
                            <p>{proveedor.telefono}</p>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}

export default Proveedores;