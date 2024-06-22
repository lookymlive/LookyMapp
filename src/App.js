import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Upload from './pages/Upload';
import VideoList from './components/VideoList';
import StoreRegister from './components/StoreRegister';
import StoreLogin from './components/StoreLogin';

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-background">
                <Header />
                <nav className="bg-surface py-4">
                    <ul className="flex justify-center space-x-6">
                        <li><Link to="/" className="text-text hover:text-primary">Inicio</Link></li>
                        <li><Link to="/search" className="text-text hover:text-primary">Buscar</Link></li>
                        <li><Link to="/upload" className="text-text hover:text-primary">Subir Video</Link></li>
                        <li><Link to="/videos" className="text-text hover:text-primary">Ver Videos</Link></li>
                        <li><Link to="/register-store" className="text-text hover:text-primary">Registrar Tienda</Link></li>
                        <li><Link to="/login-store" className="text-text hover:text-primary">Iniciar Sesión</Link></li>
                    </ul>
                </nav>
                <main className="container mx-auto px-4 py-8">
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
