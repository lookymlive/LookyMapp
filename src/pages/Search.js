import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/videos/search?term=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Error en la búsqueda');
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Buscar Videos</h2>
            <form onSubmit={handleSearch} className="mb-8">
                <div className="flex">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar videos..."
                        className="flex-grow px-3 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button type="submit" className="bg-primary text-black font-bold py-2 px-4 rounded-r-md hover:bg-opacity-80 transition-colors duration-300">
                        Buscar
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {searchResults.map((video) => (
                    <div key={video._id} className="bg-surface rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                        <div className="aspect-w-16 aspect-h-9">
                            <video controls className="object-cover w-full h-full">
                                <source src={`/uploads/${video.fileName}`} type="video/mp4" />
                                Tu navegador no soporta el tag de video.
                            </video>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2 truncate">{video.title}</h3>
                            <p className="text-sm text-gray-400">{video.storeId.storeName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
