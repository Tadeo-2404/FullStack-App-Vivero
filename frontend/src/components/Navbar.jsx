import { useRef } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar(){
    const menu = useRef();

    const handleMenu = () => {
        menu.current.classList.toggle("activo");
    }

    const closeMenu = () => {
        menu.current.classList.remove("activo");
    }

    return(
        <nav className="navbar">

            <div className="navbar__contenedor" ref={menu}>
                <div className="navbar__paginas">
                    {/* Hacer un componente especial al que le pasemos la ruta y el texto como children 
                    y automáticamente le ponga la clase navbar__link y los onClick*/}
                    <NavLink className="navbar__link" to="/" onClick={closeMenu}>Inicio</NavLink>
                    <NavLink className="navbar__link" to="/admin/publicar" onClick={closeMenu}>Publicar producto</NavLink>
                </div>
                <div className="navbar__sesion">
                    <NavLink className="navbar__link" to="/iniciar-sesion" onClick={closeMenu}>Iniciar sesión</NavLink>
                </div>
            </div>

            <div className="navbar__hamburguesa" onClick={handleMenu}>
                <div className="linea"></div>
                <div className="linea"></div>
                <div className="linea"></div>
            </div>

        </nav>
    )
}

export default Navbar;