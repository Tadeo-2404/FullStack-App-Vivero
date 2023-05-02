import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function FormEditarProveedor(){
    const navigate = useNavigate();

    const { id } = useParams();
    const [proveedor, setProveedor] = useState(null);

    // URL para obtener el proveedor
    const url = `http://localhost:3000/api/proveedores?id=${id}`;

    // Se obtiene el proveedor
    useEffect(() => {
        const obtenerProveedor = async () => {
            let res = await fetch(url);
            let datos = await res.json();

            setProveedor(datos[0]);
        }
        obtenerProveedor();
    }, [])

    const handleSubmit = e => {
        e.preventDefault();

        // Hacer fetch con method put para actualizar los datos
        fetch(`http://localhost:3000/api/proveedores?id=${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(proveedor)
        })
        .then(res => res.json())
        .then(res => {
            // Verificar si hay un error
            if(!res.msg){
                console.log("Proveedor actualizado", res);
                toast.success("Proveedor actualizado");
            } else {
                // console.log(res.msg);
                toast.error(res.msg);
            }
            navigate("/");
        })
    }

    const handleInput = e => {
        setProveedor({
            ...proveedor,
            [e.target.name]: e.target.value
        });
    }

    if(!proveedor) return <h1 className="titulo">No existe el proveedor</h1>

    return(
        <main className="main">
            <h1 className="titulo">Editar proveedor</h1>
            <form action="" className="form contenedor" onSubmit={handleSubmit}>

                <div className="form__apartado">
                    <label htmlFor="nombre">Nombre del proveedor</label>
                    <input
                        name="nombre"
                        id="nombre"
                        className="form__input"
                        type="text"
                        onInput={handleInput}
                        value={proveedor.nombre}
                    />
                </div>
                
                <div className="form__apartado">
                    <label htmlFor="telefono">Número de teléfono</label>
                    <input
                        name="telefono"
                        id="telefono"
                        className="form__input"
                        type="tel"
                        minLength={10}
                        maxLength={10}
                        pattern="\d{10}"
                        onInput={handleInput}
                        value={proveedor.telefono}
                    />
                </div>

                <input type="submit" className="form__input form__input--boton boton" value="Editar" />

            </form>
        </main>
    )
}

export default FormEditarProveedor;