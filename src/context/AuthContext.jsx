import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('blog_token'));
  const [loading, setLoading] = useState(true);

  // Verify token validity on boot
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Token expired or invalid
          logout();
        }
      } catch (error) {
        console.error('Failed to verify token', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [token]);

  // Login handler
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      localStorage.setItem('blog_token', data.token);
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } catch (error) {
      throw error;
    }
  };

  // Register handler
  const register = async (username, email, password, avatar = '', bio = '') => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, avatar, bio }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please check your input.');
      }

      localStorage.setItem('blog_token', data.token);
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } catch (error) {
      throw error;
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('blog_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
};
