import React, { useState } from 'react';
import axios from 'axios';

const UserLookup = ({ setPublicKey }) => {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.get(`/api/public-key/${identifier}`);
      setPublicKey(response.data.publicKey);
      setIdentifier('');
    } catch (err) {
      setError('User not found or an error occurred');
    }
  };

  const lookupStyles = {
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
    errorMessage: {
      color: 'red',
      marginTop: '10px',
    },
  };

  return (
    <div style={lookupStyles.container}>
      <div style={lookupStyles.formContainer}>
        <h3 style={lookupStyles.heading}>Find User Public Key</h3>
        <form onSubmit={handleSearch}>
          <input
            style={lookupStyles.input}
            type="text"
            placeholder="Enter username or email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <button
            style={lookupStyles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = lookupStyles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = lookupStyles.button.backgroundColor)}
            type="submit"
          >
            Search
          </button>
        </form>
        {error && <p style={lookupStyles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
};

export default UserLookup;
