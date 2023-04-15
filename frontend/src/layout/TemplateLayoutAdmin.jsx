import { Outlet } from 'react-router-dom'
import Navbar from "../components/Navbar";

const TemplateLayoutAdmin = () => {
  return (
    <>
    <Navbar />
        <h1>admin</h1>
        <Outlet />
    </>
  )
}

export default TemplateLayoutAdmin