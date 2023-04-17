import { useState, useEffect } from "react";

function useArticulos({ url, limite }){
    const [cargando, setCargando] = useState(true);
    const [articulos, setArticulos] = useState(null);

    useEffect(() => {
        setCargando(true);

        const obtenerArticulos = async () => {
            // Se limita a 5 articulos (para mostrar en inicio)
            let paramLimite = limite && `limite=${limite}`
            let res = await fetch(`${url}?${paramLimite}`);
            let data = await res.json();

            setArticulos(data);
            setCargando(false);
        }
        obtenerArticulos();
    }, [url, limite])

    return [ cargando, articulos ];
}

export default useArticulos;