import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
// const user = false;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

