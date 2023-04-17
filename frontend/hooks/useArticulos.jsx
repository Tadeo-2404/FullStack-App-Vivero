import { useState, useEffect } from "react";

function useArticulos(opciones){
    const { url, limite } = opciones;
    const [articulos, setArticulos] = useState(null);

    useEffect(() => {
        const obtenerArticulos = async () => {
            // Se limita a 5 articulos (para mostrar en inicio)
            let paramLimite = limite && `limite=${limite}`
            let res = await fetch(`${url}?${paramLimite}`);
            let data = await res.json();

            setArticulos(data);
        }
        obtenerArticulos();
    }, [opciones])

    return { articulos }
}

export default useArticulos;