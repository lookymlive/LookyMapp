import React, { useState } from 'react';

function StoreRegister() {
  const [storeName, setStoreName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('/api/stores/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeName,
          email,
          password
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registro exitoso. Ya puedes iniciar sesión.');
        setStoreName('');
        setEmail('');
        setPassword('');
      } else {
        setMessage(data.message || 'Error en el registro. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al registrar la tienda:', error);
      setMessage('Error en el servidor. Por favor, intenta más tarde.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">Registro de Tienda</h2>
      {message && <p className={`mb-4 text-center ${message.includes('exitoso') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Nombre de la tienda"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button type="submit" className="w-full bg-primary text-black font-bold py-3 px-4 rounded-lg hover:bg-opacity-80 transition-colors duration-300">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default StoreRegister;
