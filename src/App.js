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
            <div>
                <Header />
                <nav>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/search">Buscar</Link></li>
                        <li><Link to="/upload">Subir Video</Link></li>
                        <li><Link to="/videos">Ver Videos</Link></li>
                        <li><Link to="/register-store">Registrar Tienda</Link></li>
                        <li><Link to="/login-store">Iniciar Sesión</Link></li>
                    </ul>
                </nav>
                <main style={styles.main}>
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

const styles = {
    main: {
        padding: '1rem',
    },
};

export default App;
