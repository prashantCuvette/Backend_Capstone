import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Sync localStorage when user/token changes
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user, token]);

  // Initial loading state
  useEffect(() => {
    setLoading(false);
  }, []);

  const signup = async (formData) => {
    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      // To log FormData content
      console.log("Form Data entries:");
      for (let [key, value] of data.entries()) {
        console.log(key, value);
      }

      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        // Don't set Content-Type header - let browser set it with boundary
        body: data, // Send FormData object, not JSON
      });

      const result = await response.json();
      console.log("Signup response:", result); // Debug log

      if (response.ok) {
        setUser(result.user);
        setToken(null); // no token yet
        navigate("/login");
      } else {
        throw new Error(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials), // Fixed: Added JSON.stringify
      });

      const result = await response.json();
      if (response.ok) {
        setUser(result.user);
        setToken(result.token);
        navigate("/");
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  // Show loading state
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
