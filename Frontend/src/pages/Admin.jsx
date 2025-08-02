import { useAuth } from "../contexts/AuthContext";

const Admin = () => {
    const { user } = useAuth();
    console.log(user.role);
  return (
    <div>
        <h1>Admin Dashboard</h1>
    </div>
  )
}

export default Admin
