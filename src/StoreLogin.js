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
        // Aquí puedes guardar el token en el localStorage o en el estado de la aplicación
        localStorage.setItem('token', data.token);
        // Redirigir al usuario o actualizar el estado de la aplicación
      } else {
        setMessage(data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setMessage('Error en el servidor. Por favor, intenta más tarde.');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {message && <p style={{color: message.includes('exitoso') ? 'green' : 'red'}}>{message}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default StoreLogin;