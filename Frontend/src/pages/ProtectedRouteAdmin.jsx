import { useAuth } from "../contexts/AuthContext";

const ProtectedRouteAdmin = ({ children }) => {
  const { user } = useAuth();

  return user.role === "admin" ? children : <HomeWork />;
};

export default ProtectedRouteAdmin;



const HomeWork = () => {
  return (
    <>
      <h1>Access Denied</h1>
      <ul>
        <li>
          if anyone apart from admin tries to access this rouet redirect user to
          the home i.e. / route
        </li>
        <li>use the auth context to fetch the data which admin can access</li>
        <li>show the database on the screen</li>
        <li>Make a design on your own</li>
        <li>then just render the data</li>
      </ul>

      <h2>
        {" "}
        in jwt token also pass <span style={{
          color: "red"
        }}>role as payload</span> so that you have the
        value with each request and add middleware in the backend which checks
        this
      </h2>
    </>
  );
}
