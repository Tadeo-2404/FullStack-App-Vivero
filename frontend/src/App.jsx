import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

import Inicio from './pages/Inicio';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';

function App(){
    return(
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App;