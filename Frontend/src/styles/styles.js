export const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        fontFamily: "system-ui, -apple-system, sans-serif",
    },
    formCard: {
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "40px",
        width: "100%",
        maxWidth: "400px",
        position: "relative",
    },
    title: {
        fontSize: "28px",
        fontWeight: "700",
        textAlign: "center",
        marginBottom: "8px",
        color: "#1f2937",
    },
    subtitle: {
        fontSize: "16px",
        textAlign: "center",
        color: "#6b7280",
        marginBottom: "32px",
    },
    imageUpload: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "24px",
    },
    imagePreview: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        backgroundColor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "12px",
        borderWidth: '2px',
        borderStyle: 'dashed',
        borderColor: '#d1d5db',
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 0.2s ease",
    },
    imagePreviewHover: {
        borderColor: "#3b82f6",
        backgroundColor: "#eff6ff",
    },
    uploadedImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    uploadText: {
        fontSize: "14px",
        color: "#6b7280",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    inputGroup: {
        position: "relative",
    },
    label: {
        display: "block",
        fontSize: "14px",
        fontWeight: "500",
        color: "#374151",
        marginBottom: "6px",
    },
    inputWrapper: {
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    input: {
        width: "100%",
        padding: "12px 16px",
        paddingLeft: "44px",
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#e5e7eb',
        borderRadius: "8px",
        fontSize: "16px",
        transition: "all 0.2s ease",
        outline: "none",
    },
    inputFocus: {
        borderColor: "#3b82f6",
        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    },
    inputIcon: {
        position: "absolute",
        left: "14px",
        color: "#9ca3af",
        zIndex: 1,
    },
    eyeIcon: {
        position: "absolute",
        right: "14px",
        color: "#9ca3af",
        cursor: "pointer",
        zIndex: 1,
    },
    button: {
        width: "100%",
        padding: "14px",
        backgroundColor: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
        marginTop: "8px",
    },
    buttonHover: {
        backgroundColor: "#2563eb",
        transform: "translateY(-1px)",
    },
    switchText: {
        textAlign: "center",
        marginTop: "24px",
        fontSize: "14px",
        color: "#6b7280",
    },
    switchLink: {
        color: "#3b82f6",
        textDecoration: "none",
        fontWeight: "500",
        cursor: "pointer",
    },
    hiddenInput: {
        display: "none",
    },
};