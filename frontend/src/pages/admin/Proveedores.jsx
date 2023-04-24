import { useEffect, useState } from "react";

function Proveedores(){
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        const obtenerProveedores = async () => {
            let res = await fetch("http://localhost:3000/api/proveedores");
            let data = await res.json();

            setProveedores(data);
        }
        obtenerProveedores();
    }, [])

    return(
        <main className="main">
            <h1 className="titulo">Proveedores</h1>
            <div className="contenedor proveedores">
                {
                    proveedores.map(proveedor => (
                        <div className="proveedor" key={proveedor.id}>
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