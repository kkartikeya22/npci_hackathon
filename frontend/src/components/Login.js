import React, { useState } from 'react';
import axios from 'axios';

function Login({ setPublicKey }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { username, password });
      setPublicKey(response.data.publicKey); // Save user's public key for transactions
      setModalMessage('Login successful');
      setShowModal(true);

      // Automatically close modal after 5 seconds
      setTimeout(() => {
        setShowModal(false);
      }, 5000);
    } catch (error) {
      setModalMessage('Login failed');
      setShowModal(true);
    }
  };

  const loginStyles = {
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
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#218838',
    },
    heading: {
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333',
    },
    modalOverlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      width: '300px',
      textAlign: 'center',
    },
    closeModalButton: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      marginTop: '10px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.formContainer}>
        <h2 style={loginStyles.heading}>Login</h2>
        <input
          style={loginStyles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={loginStyles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={loginStyles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = loginStyles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = loginStyles.button.backgroundColor)}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>

      {showModal && (
        <div style={loginStyles.modalOverlay}>
          <div style={loginStyles.modalContent}>
            <p>{modalMessage}</p>
            <button
              style={loginStyles.closeModalButton}
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
