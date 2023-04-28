import { useState, useEffect } from "react";

function useProductos(url){
    const [cargando, setCargando] = useState(true);
    const [productos, setProductos] = useState(null);

    useEffect(() => {
        setCargando(true);

        const obtenerProductos = async () => {
            let res = await fetch(url);
            let data = await res.json();

            setProductos(data);
            setCargando(false);
        }
        obtenerProductos();
    }, [url])

    return [ cargando, productos ];
}

export default useProductos;