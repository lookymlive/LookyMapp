import React, { useState } from 'react';

function StoreLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('/api/stores/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Inicio de sesión exitoso');
        localStorage.setItem('token', data.token);
        // Aquí puedes redirigir al usuario o actualizar el estado de la aplicación
      } else {
        setMessage(data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setMessage('Error en el servidor. Por favor, intenta más tarde.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Iniciar Sesión de Tienda</h2>
      {message && <p className={`mb-4 ${message.includes('exitoso') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button type="submit" className="w-full bg-primary text-black font-bold py-2 px-4 rounded hover:bg-opacity-80 transition-colors duration-300">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default StoreLogin;