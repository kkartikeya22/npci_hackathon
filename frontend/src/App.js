import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Transaction from './components/Transaction';

function App() {
  const [publicKey, setPublicKey] = useState(null);
  const [showRegister, setShowRegister] = useState(true); // Toggle between Register and Login

  const appStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw', // Full width
      backgroundColor: '#e9ecef', // Light grey background
      fontFamily: 'Arial, sans-serif', // Font style
      padding: '20px',
      boxSizing: 'border-box', // Include padding in width/height
    },
    content: {
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Softer shadow
      maxWidth: '500px',
      width: '100%', // Take full width up to maxWidth
      textAlign: 'center',
      border: '1px solid #dee2e6', // Add a border for a formal look
    },
    heading: {
      fontSize: '28px',
      marginBottom: '20px',
      color: '#343a40', // Darker grey for text
      fontWeight: '600', // Bolder text
    },
    linkButton: {
      color: '#007bff',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'underline',
      marginTop: '15px',
      fontSize: '14px', // Slightly smaller font size
    },
    button: {
      padding: '12px 20px',
      marginTop: '15px',
      borderRadius: '5px',
      border: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      backgroundColor: '#007bff',
      color: '#ffffff',
      transition: 'background-color 0.3s, transform 0.2s', // Transition for hover effects
    },
    buttonHover: {
      backgroundColor: '#0056b3', // Darker blue on hover
      transform: 'scale(1.05)', // Slight scale effect on hover
    },
  };

  return (
    <div style={appStyles.container}>
      <div style={appStyles.content}>
        <h1 style={appStyles.heading}>Anonymous Payment System</h1>
        {!publicKey ? (
          <>
            {showRegister ? (
              <>
                <Register onRegisterSuccess={() => setShowRegister(false)} />
                <button
                  style={appStyles.linkButton}
                  onClick={() => setShowRegister(false)}
                >
                  Already registered? Login here
                </button>
              </>
            ) : (
              <>
                <Login setPublicKey={setPublicKey} />
                <button
                  style={appStyles.linkButton}
                  onClick={() => setShowRegister(true)}
                >
                  Don't have an account? Register here
                </button>
              </>
            )}
          </>
        ) : (
          <Transaction publicKey={publicKey} />
        )}
      </div>
    </div>
  );
}

export default App;
