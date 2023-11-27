// auth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApolloClient, gql } from '@apollo/client';

const VALIDATE_TOKEN = gql`
  query ValidateToken($token: String!) {
    validateToken(token: $token) 
    
  }
`;

const useAuth = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const token = localStorage.getItem('token');

  const tokenIsValid = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const { data } = await client.query({
        query: VALIDATE_TOKEN,
        variables: { token: token },
      });
      console.log(data.validateToken==true,"hwbdwhdwwhbh")
      if (!data.validateToken==true) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error validating token:', error);
      navigate('/login');
    }
  };

  useEffect(() => {
    (async () => {
      await tokenIsValid();
    })();
  }, [token, navigate, client]);

  return {};
};

export default useAuth;
