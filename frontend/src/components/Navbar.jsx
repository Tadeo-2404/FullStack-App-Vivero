import { NavLink } from 'react-router-dom';

function Navbar(){
    return(
        <nav className="navbar">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/admin/publicar">Publicar producto</NavLink>
        </nav>
    )
}

export default Navbar;