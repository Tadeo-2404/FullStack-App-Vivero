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
            let datos = (await res.json())[0];

            // Se separan los datos
            let [calle, numero, colonia, cp] = datos.direccion.split(/[,#]/).map(e => e.trim());

            setProveedor({
                nombre: datos.nombre,
                telefono: datos.telefono,
                rfc: datos.rfc,
                calle, numero, colonia, cp
            });
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
                navigate("/");
            } else {
                // console.log(res.msg);
                toast.error(res.msg);
            }
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
            <h1 className="titulo">Editar proveedor #{id}</h1>
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

                <div className="form__apartado">
                    <label htmlFor="rfc">RFC del proveedor</label>
                    <input
                    name="rfc"
                    id="rfc"
                    className="form__input"
                    type="text"
                    onInput={handleInput}
                    value={proveedor.rfc}
                    pattern="^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$"
                    title="Debe contener entre 12 y 13 caracteres (letras mayúsculas y números)"
                    minLength="12"
                    maxLength="13"
                    required
                    />
                </div>

                <div className="form__apartado">
                    <label htmlFor="calle">Calle de la empresa</label>
                    <input
                    name="calle"
                    id="calle"
                    className="form__input"
                    type="text"
                    onInput={handleInput}
                    pattern="^[a-zA-Z]{1,30}(\s?[a-zA-Z]{0,30})+$"
                    value={proveedor.calle}
                    required
                    />
                </div>

                <div className="form__apartado">
                    <label htmlFor="numero">Número de calle</label>
                    <input
                    name="numero"
                    id="numero"
                    className="form__input"
                    type="text"
                    onInput={handleInput}
                    pattern="^\d+[A-Za-z]?$"
                    value={proveedor.numero}
                    required
                    />
                </div>

                <div className="form__apartado">
                    <label htmlFor="colonia">Colonia de la empresa</label>
                    <input
                    name="colonia"
                    id="colonia"
                    className="form__input"
                    type="text"
                    onInput={handleInput}
                    pattern="^[a-zA-Z]{1,30}(\s?[a-zA-Z]{0,30})+$"
                    value={proveedor.colonia}
                    required
                    />
                </div>

                <div className="form__apartado">
                    <label htmlFor="cp">Código postal de la empresa</label>
                    <input
                    name="cp"
                    id="cp"
                    className="form__input"
                    type="tel"
                    pattern="^\d{5}$"
                    minLength={5}
                    maxLength={5}
                    onInput={handleInput}
                    value={proveedor.cp}
                    required
                    />
                </div>

                <input type="submit" className="form__input form__input--boton boton" value="Editar" />

            </form>
        </main>
    )
}

export default FormEditarProveedor;