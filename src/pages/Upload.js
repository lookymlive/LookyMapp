import React, { useState } from 'react';

function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Por favor, selecciona un video');
      return;
    }

    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Video subido exitosamente');
        setFile(null);
        setTitle('');
        setDescription('');
      } else {
        setMessage(data.message || 'Error al subir el video');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error en el servidor');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Subir Video</h2>
      {message && <p className={`mb-4 ${message.includes('exitosamente') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="file" className="block text-sm font-medium mb-2">Seleccionar video</label>
          <input 
            type="file" 
            id="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <input
          type="text"
          placeholder="Título del video"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <textarea
          placeholder="Descripción del video"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button type="submit">Subir Video</button>
      </form>
    </div>
  );
}

export default Upload;
