import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>LookyMapp</h1>
            <nav>
                <ul style={styles.navList}>
                    <li style={styles.navItem}><NavLink to="/" style={styles.link}>Inicio</NavLink></li>
                    <li style={styles.navItem}><NavLink to="/search" style={styles.link}>Buscar</NavLink></li>
                    <li style={styles.navItem}><NavLink to="/upload" style={styles.link}>Subir Video</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

// ... rest of the component
const styles = {
    // ... (mantén los estilos existentes)
    link: {
        color: 'white',
        textDecoration: 'none',
    },
};

export default Header;