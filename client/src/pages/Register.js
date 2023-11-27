//import React from "react";
import React, { useState } from 'react';
import { useMutation, gql  } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//import client from './apollo'; // Import the Apollo Client instance

const REGISTER = gql`
  mutation Register($userId: String!, $passcode: String!, $emailId: String!, $userName: String!) {
    createUser(userId: $userId, passcode: $passcode, emailId: $emailId, userName: $userName) {
      id
      userId
      emailId
    }
  }
`;

const Register = () => {
  const [userId, setUserId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [emailId, setEmailId] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const [register, { loading, error }] = useMutation(REGISTER, {
   
    onCompleted: ({ createUser }) => {
      console.log('Registered:', createUser);
      alert('You have successfully registered! Please log in.');
      navigate('/login'); 
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });

  const handleRegister = (e) => {
    e.preventDefault();
    register({ variables: { userId, passcode, emailId, userName } });
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          required
          type="text"
          placeholder="User Id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
         <input
          required
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p>Error: {error.message}</p>}
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;