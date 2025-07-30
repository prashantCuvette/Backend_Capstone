import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // already in local stoarge or not
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [token, setToken] = useState(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // user && token
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [user, token]);

  const signup = async (formData) => {
    try {
      // user input
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      // http://localhost:3000/
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        setUser(result.user);
        setToken(null);
        navigate("/login");
      } else {
        throw new Error(result.message || "Signup Failed");
        // add a react-host-toast notification
      }
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      // credentials is all the values during login coming in stringified way

      const result = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: credentials,
      });
      const res = await result.json();

      if (res.ok) {
        setUser(result.user); // backend
        setToken(result.token); // from the backend
        navigate("/");
      } else {
        throw new Error(result.message || "Signup Failed");
        // add a react-host-toast notification
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    navigate("/login");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


