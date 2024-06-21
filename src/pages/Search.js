import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Datos de muestra
    const allVideos = [
        { id: 1, title: 'Tienda de ropa XYZ', thumbnail: 'https://via.placeholder.com/300x200.png?text=Tienda+XYZ' },
        { id: 2, title: 'Zapatería ABC', thumbnail: 'https://via.placeholder.com/300x200.png?text=Zapatería+ABC' },
        { id: 3, title: 'Joyería 123', thumbnail: 'https://via.placeholder.com/300x200.png?text=Joyería+123' },
        { id: 4, title: 'Tienda de electrónica QWE', thumbnail: 'https://via.placeholder.com/300x200.png?text=Electrónica+QWE' },
        { id: 5, title: 'Librería ZXC', thumbnail: 'https://via.placeholder.com/300x200.png?text=Librería+ZXC' },
    ];

    const handleSearch = (event) => {
        event.preventDefault();
        const results = allVideos.filter(video =>
            video.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <div>
            <h2>Buscar Videos</h2>
            <form onSubmit={handleSearch} style={styles.form}>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Buscar</button>
            </form>
            <div style={styles.results}>
                {searchResults.length > 0 ? (
                    searchResults.map(video => (
                        <VideoCard key={video.id} title={video.title} thumbnail={video.thumbnail} />
                    ))
                ) : (
                    <p>No se encontraron resultados.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    form: {
        display: 'flex',
        marginBottom: '1rem',
    },
    input: {
        flex: 1,
        padding: '0.5rem',
        fontSize: '1rem',
    },
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        backgroundColor: '#4a90e2',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
    results: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
};

export default Search;