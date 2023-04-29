import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop({children}){
    const location = useLocation();

    // Cada que hay un cambio en las rutas, se ejecuta este useEffect y hace scroll hasta arriba
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return children;
}

export default ScrollToTop;