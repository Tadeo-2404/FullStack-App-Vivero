import GaleriaArticulos from "../components/GaleriaArticulos";

function Sustratos(){
    return(
        <main className="contenedor main">
            <h1 className="titulo">Sustratos</h1>

            <GaleriaArticulos opciones={{
                url: "http://localhost:3000/api/sustratos"
            }} />
        </main>
    )
}

export default Sustratos;