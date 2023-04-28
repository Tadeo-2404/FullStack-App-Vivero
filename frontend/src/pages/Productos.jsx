import GaleriaProductos from "../components/GaleriaProductos";

function Productos(){
    const urlBackend = 'http://localhost:3000/api'; //url del backend
    const origin = window.location.origin; //obtener url actual completa
    const href = window.location.href; //obtener ruta a partir de /productos
    const query = href.replace(origin, ""); //obtener ruta de consulta
    return(
        <main className="contenedor main">
            <h1 className="titulo">Productos</h1>

            <GaleriaProductos url={`${urlBackend}${query}`} />
        </main>
    )
}

export default Productos;