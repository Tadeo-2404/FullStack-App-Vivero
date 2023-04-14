import { useState, useEffect } from 'react';

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
            <footer className="footer">
                <div className="contenedor footer__contenedor">
                    <h1 className="titulo footer_title">Todos los derechos resevados &copy; {fecha}</h1>
                </div>
            </footer>
        </>
    )
}

export default Footer;