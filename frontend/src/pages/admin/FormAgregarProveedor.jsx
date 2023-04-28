import { useState } from "react";

function FormAgregarProveedor(){
    const [datos, setDatos] = useState({
        nombre: "",
        telefono: ""
    });

    const handleSubmit = async e => {
        e.preventDefault();

        // Se hace una petición para agregar el proveedor
        let res = await fetch(`http://localhost:3000/api/proveedores`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
        let data = await res.json();
        console.log("Proveedor agregado", data);
    }

    const handleInput = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    return(
        <main className="main">
            <h1 className="titulo">Agregar proveedor</h1>
            <form action="" className="form contenedor" onSubmit={handleSubmit}>

                <div className="form__apartado">
                    <label htmlFor="nombre">Nombre del proveedor</label>
                    <input
                        name="nombre"
                        id="nombre"
                        className="form__input"
                        type="text"
                        onInput={handleInput}
                        value={datos.nombre}
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
                        value={datos.telefono}
                    />
                </div>

                <input type="submit" className="form__input form__input--boton boton" value="Agregar" />

            </form>
        </main>
    )
}

export default FormAgregarProveedor;