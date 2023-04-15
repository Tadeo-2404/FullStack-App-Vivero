import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar";

const TemplateLayoutCliente = () => {
  return (
    <>
    <Navbar/>
        <h1>cliente</h1>
        <Outlet />
    </>
  )
}

export default TemplateLayoutCliente
