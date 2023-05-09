import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function FormAgregarProveedor(){

    /* AGREGAR # A NUMERO
    MANDARLO SEPARADO
    */
    const navigate = useNavigate();
    const [datos, setDatos] = useState({
        nombre: "",
        telefono: "",
        rfc: "",
        calle: "",
        numero: "",
        colonia: "",
        cp: "",
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
        
        // Verificar si hay un error
        if(!data.msg){
            console.log("Proveedor agregado", data);
            toast.success("Proveedor agregado");
            navigate("/");
        } else {
            // console.log(data.msg);
            toast.error(data.msg);
        }
    }

    const handleInput = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    return (
      <main className="main">
        <h1 className="titulo">Agregar proveedor</h1>
        <form action="" className="form contenedor" onSubmit={handleSubmit}>
          <div className="form__apartado">
            <label htmlFor="rfc">RFC del proveedor</label>
            <input
              name="rfc"
              id="rfc"
              className="form__input"
              type="text"
              onInput={handleInput}
              value={datos.rfc}
              pattern={/^[A-Za-z0-9]{1,13}$/}
              minLength="12"
              maxLength="13"
              required
            />
          </div>

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

          <div className="form__apartado">
            <label htmlFor="calle">calle de la empresa</label>
            <input
              name="calle"
              id="calle"
              className="form__input"
              type="text"
              onInput={handleInput}
              pattern={/^[a-zA-Z]{1,30}(\s?[a-zA-Z]{0,30})+$/}
              value={datos.calle}
              required
            />
          </div>

          <div className="form__apartado">
            <label htmlFor="numero">Numero De La Empresa</label>
            <input
              name="numero"
              id="numero"
              className="form__input"
              type="text"
              onInput={handleInput}
              pattern={/^\d+[A-Za-z]?$/}
              value={datos.numero}
              required
            />
          </div>

          <div className="form__apartado">
            <label htmlFor="colonia">Colonia De La Empresa</label>
            <input
              name="colonia"
              id="colonia"
              className="form__input"
              type="text"
              onInput={handleInput}
              pattern={/^[a-zA-Z]{1,30}(\s?[a-zA-Z]{0,30})+$/}
              value={datos.colonia}
              required
            />
          </div>

          <div className="form__apartado">
            <label htmlFor="cp">Cp De La Empresa</label>
            <input
              name="cp"
              id="cp"
              className="form__input"
              type="tel"
              pattern={/^\d{5}$/}
              onInput={handleInput}
              value={datos.cp}
              required
            />
          </div>

          <input
            type="submit"
            className="form__input form__input--boton boton"
            value="Agregar"
          />
        </form>
      </main>
    );
}

export default FormAgregarProveedor;