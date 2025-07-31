import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Example: Clear user session and redirect to login
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h2 style={{ margin: 0 }}>MyMemories</h2>
      </div>
      <div style={styles.right}>
        <Link to="/profile" style={styles.link}>
          Profile
        </Link>
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ddd",
  },
  left: {
    fontWeight: "bold",
    fontSize: "24px",
  },
  right: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },
  button: {
    padding: "6px 12px",
    border: "none",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Header;
