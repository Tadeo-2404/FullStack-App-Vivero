import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Footer(){
    const [fecha, setFecha] = useState(0);

    useEffect(() => {
        const updateDate = () => {
            setFecha(new Date().getFullYear())
        }
        updateDate();
    }, [])

    return (
        <>
            <footer className="footer contenedor">
                {/* <h3 className="titulo footer_title">Todos los derechos resevados &copy; {fecha}</h3> */}
                <Link className="boton" to="/">Inicio</Link>
            </footer>
        </>
    )
}

export default Footer;