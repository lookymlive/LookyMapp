import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [recentVideos, setRecentVideos] = useState([]);

  useEffect(() => {
    fetchRecentVideos();
  }, []);

  const fetchRecentVideos = async () => {
    try {
      const response = await fetch('/api/videos?limit=6');
      if (!response.ok) {
        throw new Error('Error al obtener los videos recientes');
      }
      const data = await response.json();
      setRecentVideos(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a LookyMapp</h1>
      <p className="text-xl mb-8">Descubre las mejores vidrieras de tu ciudad</p>
      
      <h2 className="text-2xl font-bold mb-6">Videos Recientes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8">
        {recentVideos.map((video) => (
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
      
      <Link to="/videos" className="inline-block bg-primary text-black font-bold py-2 px-4 rounded hover:bg-opacity-80 transition-colors duration-300">
        Ver todos los videos
      </Link>
    </div>
  );
}

export default Home;
