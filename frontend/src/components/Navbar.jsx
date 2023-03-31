import { NavLink } from 'react-router-dom';

function Navbar(){
    return(
        <nav className="navbar">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/otro-lado">Otro lado</NavLink>
        </nav>
    )
}

export default Navbar;