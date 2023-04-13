import { useState, useEffect } from 'react'
const Footer = () => {
    const [fecha, setFecha] = useState(0);

    useEffect(() => {
      const updateDate = () => {
        setFecha(new Date().getFullYear())
      }
      updateDate();
    }, [])
  return (
    <>
     <div className='footer_container'>
        <div className='footer_body'>
            <h1 className='footer_title'>Todos los derechos resevados &copy; {fecha}</h1>
        </div>
     </div>
    </>
  )
}

export default Footer