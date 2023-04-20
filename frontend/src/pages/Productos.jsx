import GaleriaProductos from "../components/GaleriaProductos";

function Productos(){
    return(
        <main className="contenedor main">
            <h1 className="titulo">Productos</h1>

            <GaleriaProductos opciones={{
                url: "http://localhost:3000/api/productos"
            }} />
        </main>
    )
}

export default Productos;