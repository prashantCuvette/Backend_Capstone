import { useState } from "react";
import { styles } from "../styles/styles";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const LoginForm = ({
  title = "Welcome Back",
  subtitle = "Sign in to your account",
  primaryColor = "#3b82f6",
  onSubmit = () => {},
  onSwitchToSignup = () => {},
  showSwitchLink = true,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const customStyles = {
    ...styles,
    button: { ...styles.button, backgroundColor: primaryColor },
    buttonHover: { ...styles.buttonHover, backgroundColor: primaryColor },
    switchLink: { ...styles.switchLink, color: primaryColor },
  };

  return (
    <div style={customStyles.container}>
      <div style={customStyles.formCard}>
        <h2 style={customStyles.title}>{title}</h2>
        <p style={customStyles.subtitle}>{subtitle}</p>

        <div style={customStyles.form}>
          <div style={customStyles.inputGroup}>
            <label style={customStyles.label}>Email</label>
            <div style={customStyles.inputWrapper}>
              <Mail size={20} style={customStyles.inputIcon} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField("")}
                style={{
                  ...customStyles.input,
                  ...(focusedField === "email" ? customStyles.inputFocus : {}),
                }}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div style={customStyles.inputGroup}>
            <label style={customStyles.label}>Password</label>
            <div style={customStyles.inputWrapper}>
              <Lock size={20} style={customStyles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField("")}
                style={{
                  ...customStyles.input,
                  ...(focusedField === "password"
                    ? customStyles.inputFocus
                    : {}),
                }}
                placeholder="Enter your password"
                required
              />
              {showPassword ? (
                <EyeOff
                  size={20}
                  style={customStyles.eyeIcon}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  size={20}
                  style={customStyles.eyeIcon}
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>

          <button
            type="button"
            style={customStyles.button}
            onClick={handleSubmit}
            onMouseEnter={(e) => {
              Object.assign(e.target.style, customStyles.buttonHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.target.style, customStyles.button);
            }}
          >
            Sign In
          </button>
        </div>

        {showSwitchLink && (
          <p style={customStyles.switchText}>
            Don't have an account?{" "}
            <span style={customStyles.switchLink} onClick={onSwitchToSignup}>
              <Link to="/signup"> Sign up</Link>
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
