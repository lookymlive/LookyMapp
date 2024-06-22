import React, { useState, useEffect } from 'react';

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      if (!response.ok) {
        throw new Error('Error al obtener los videos');
      }
      const data = await response.json();
      setVideos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar los videos');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Cargando videos...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Videos Recientes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="bg-surface rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="aspect-w-16 aspect-h-9">
              <video controls className="object-cover w-full h-full">
                <source src={`/uploads/${video.fileName}`} type="video/mp4" />
                Tu navegador no soporta el tag de video.
              </video>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{video.title}</h3>
              <p className="text-gray-700">{video.storeId.storeName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoList;
