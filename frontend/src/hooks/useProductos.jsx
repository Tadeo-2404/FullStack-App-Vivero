import { useState, useEffect } from "react";

function useProductos({ url, limite }){
    const [cargando, setCargando] = useState(true);
    const [productos, setProductos] = useState(null);

    useEffect(() => {
        setCargando(true);

        const obtenerProductos = async () => {
            // Se limita a 5 productos (para mostrar en inicio)
            let res = await fetch(`${url}`);
            let data = await res.json();
            console.log(data);
            setProductos(data);
            setCargando(false);
        }
        obtenerProductos();
    }, [url, limite])

    return [ cargando, productos ];
}

export default useProductos;