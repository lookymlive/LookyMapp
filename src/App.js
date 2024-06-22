import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Upload from './pages/Upload';
import VideoList from './components/VideoList';
import StoreRegister from './components/StoreRegister';
import StoreLogin from './components/StoreLogin';

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-black text-white">
                <nav className="bg-gray-900 p-4 fixed w-full top-0 z-50">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link to="/" className="text-2xl font-bold text-primary">LookyMapp</Link>
                        <ul className="flex space-x-4">
                            <li><Link to="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                            <li><Link to="/search" className="hover:text-primary transition-colors">Buscar</Link></li>
                            <li><Link to="/upload" className="hover:text-primary transition-colors">Subir</Link></li>
                            <li><Link to="/videos" className="hover:text-primary transition-colors">Videos</Link></li>
                            <li><Link to="/register-store" className="hover:text-primary transition-colors">Registrar</Link></li>
                            <li><Link to="/login-store" className="hover:text-primary transition-colors">Iniciar Sesión</Link></li>
                        </ul>
                    </div>
                </nav>
                <main className="container mx-auto pt-20 px-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/videos" element={<VideoList />} />
                        <Route path="/register-store" element={<StoreRegister />} />
                        <Route path="/login-store" element={<StoreLogin />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
