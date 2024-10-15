import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Assuming you have a Modal component

function Register({ onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false); // For showing modal

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/register', { username, password });
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        onRegisterSuccess(); // Navigate to login
      }, 5000); // Show modal for 5 seconds before navigating to Login
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const registerStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4',
      padding: '20px',
    },
    formContainer: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    heading: {
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333',
    },
  };

  return (
    <div style={registerStyles.container}>
      <div style={registerStyles.formContainer}>
        <h2 style={registerStyles.heading}>Register</h2>
        <input
          style={registerStyles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={registerStyles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={registerStyles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = registerStyles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = registerStyles.button.backgroundColor)}
          onClick={handleRegister}
        >
          Register
        </button>
      </div>

      {showModal && <Modal message="Registration successful! Redirecting to login..." />}
    </div>
  );
}

export default Register;
