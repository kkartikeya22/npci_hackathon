import React, { useState } from 'react';
import axios from 'axios';

function Transaction({ publicKey }) {
  const [receiverKey, setReceiverKey] = useState('');
  const [receiverDetails, setReceiverDetails] = useState('');
  const [amount, setAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleTransaction = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/transaction', {
        senderPublicKey: publicKey,
        receiverPublicKey: receiverKey,
        amount
      });
      setModalMessage(response.data.message);
      setShowModal(true);

      // Automatically close modal after 5 seconds
      setTimeout(() => {
        setShowModal(false);
      }, 5000);
    } catch (error) {
      console.error("Transaction failed", error);
      setModalMessage("Transaction failed: " + error.response?.data?.message || error.message);
      setShowModal(true);
    }
  };

  const fetchReceiverPublicKey = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/public-key/${receiverDetails}`);
      setReceiverKey(response.data.publicKey);
    } catch (error) {
      console.error("Failed to fetch public key", error);
      setModalMessage("Failed to fetch public key: " + error.response?.data?.message || error.message);
      setShowModal(true);
    }
  };

  const transactionStyles = {
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
      backgroundColor: '#28a745',
      color: '#fff',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      marginTop: '10px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={transactionStyles.container}>
      <div style={transactionStyles.formContainer}>
        <h2 style={transactionStyles.heading}>Send Payment</h2>
        <input
          style={transactionStyles.input}
          type="text"
          placeholder="Receiver's Username or Email"
          value={receiverDetails}
          onChange={(e) => setReceiverDetails(e.target.value)}
        />
        <button
          style={transactionStyles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = transactionStyles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = transactionStyles.button.backgroundColor)}
          onClick={fetchReceiverPublicKey}
        >
          Fetch Public Key
        </button>

        <input
          style={transactionStyles.input}
          type="text"
          placeholder="Receiver Public Key"
          value={receiverKey}
          readOnly
        />
        <input
          style={transactionStyles.input}
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          style={transactionStyles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = transactionStyles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = transactionStyles.button.backgroundColor)}
          onClick={handleTransaction}
        >
          Send
        </button>
      </div>

      {showModal && (
        <div style={transactionStyles.modalOverlay}>
          <div style={transactionStyles.modalContent}>
            <p>{modalMessage}</p>
            <button
              style={transactionStyles.closeModalButton}
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

export default Transaction;
