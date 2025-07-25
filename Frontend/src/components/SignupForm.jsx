import { useState } from "react";
import { styles } from "../styles/styles";
import { User, Mail, Lock, Eye, EyeOff, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const SignupForm = ({
  title = "Create Account",
  subtitle = "Join us today",
  primaryColor = "#3b82f6",
  onSubmit = () => {},
  onSwitchToLogin = () => {},
  showSwitchLink = true,
  showImageUpload = true,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
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

        {showImageUpload && (
          <div style={customStyles.imageUpload}>
            <div
              style={customStyles.imagePreview}
              onClick={() => document.getElementById("imageUpload").click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={customStyles.uploadedImage}
                />
              ) : (
                <Upload size={24} color="#9ca3af" />
              )}
            </div>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={customStyles.hiddenInput}
            />
            <p style={customStyles.uploadText}>
              Click to upload profile picture
            </p>
          </div>
        )}

        <div style={customStyles.form}>
          <div style={customStyles.inputGroup}>
            <label style={customStyles.label}>Full Name</label>
            <div style={customStyles.inputWrapper}>
              <User size={20} style={customStyles.inputIcon} />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField("")}
                style={{
                  ...customStyles.input,
                  ...(focusedField === "fullName"
                    ? customStyles.inputFocus
                    : {}),
                }}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

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

          <div style={customStyles.inputGroup}>
            <label style={customStyles.label}>Confirm Password</label>
            <div style={customStyles.inputWrapper}>
              <Lock size={20} style={customStyles.inputIcon} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField("")}
                style={{
                  ...customStyles.input,
                  ...(focusedField === "confirmPassword"
                    ? customStyles.inputFocus
                    : {}),
                }}
                placeholder="Confirm your password"
                required
              />
              {showConfirmPassword ? (
                <EyeOff
                  size={20}
                  style={customStyles.eyeIcon}
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <Eye
                  size={20}
                  style={customStyles.eyeIcon}
                  onClick={() => setShowConfirmPassword(true)}
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
            Create Account
          </button>
        </div>

        {showSwitchLink && (
          <p style={customStyles.switchText}>
            Already have an account?{" "}
            <span style={customStyles.switchLink} onClick={onSwitchToLogin}>
              <Link to="/">Sign in</Link>
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
