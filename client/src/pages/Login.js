import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link,useNavigate } from 'react-router-dom';

 
const AUTHENTICATE_USER = gql`
  mutation ValidateUser($userId: String!, $passcode: String!) {
    login(userId: $userId, passcode: $passcode) {
      token
    }
  }
`;

const Login = ( ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isNotAValidUser, setNotAValidUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [authenticateUser, { loading, error }] = useMutation(AUTHENTICATE_USER, {
    onCompleted: (result) => {
      if(error){
        setNotAValidUser(true)
        setErrorMessage(error.errorMessage)
      }
      if(result.login==null){
        setNotAValidUser(true)
        setErrorMessage("INVALID USERNAME OR PASSWORD")
      }
      
      
      else{  
      const token = result.login.token;
      console.log(token,"this is tkn")
      if (token !=null) {
        localStorage.setItem('token', token);
        console.log('this is my token',token);
        navigate('/'); 
      }
    }
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();

    // Call the mutation with variables
    authenticateUser({
      variables: {
        userId: username,
        passcode: password,
      },
    });
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
      
        
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
      
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {isNotAValidUser  && <p>{errorMessage}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
