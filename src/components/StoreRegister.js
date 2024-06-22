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
    <div>
      <h2>Registro de Tienda</h2>
      {message && <p style={{color: message.includes('exitoso') ? 'green' : 'red'}}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de la tienda"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default StoreRegister;