import React, { useState, useEffect } from 'react';

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecentVideos();
  }, []);

  const fetchRecentVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/videos?limit=6');
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const text = await response.text();
      console.log('Response text:', text);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Oops, we haven't got JSON! Content-Type: ${contentType}`);
      }
      
      const data = JSON.parse(text);
      console.log('Datos recibidos:', data);
      setVideos(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Cargando videos...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Videos Recientes</h2>
      {videos.length === 0 ? (
        <p className="text-center">No hay videos disponibles.</p>
      ) : (
        <div className="space-y-8">
          {videos.map((video) => (
            <div key={video._id} className="bg-surface rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-w-9 aspect-h-16">
                <video controls className="object-cover w-full h-full">
                  <source src={`/uploads/${video.fileName}`} type="video/mp4" />
                  Tu navegador no soporta el tag de video.
                </video>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                <p className="text-sm text-gray-400">{video.storeId?.storeName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoList;