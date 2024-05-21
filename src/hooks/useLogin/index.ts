// hooks/useLogin.ts
import { useState } from 'react';

const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: email, password })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          return result.session; // Return session data on successful login
        } else {
          setError(result.message || 'Login failed');
        }
      } else {
        setError('Failed to login');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Internal server error');
    }

    return null;
  };

  return { login, error, setError };
};

export default useLogin;
