
import { useAuth } from '../contexts/AuthContext'

const API_URL = import.meta.VITE_API_URL;

const Profile = () => {
  const {user} = useAuth();
  console.log(user);
  return (
    <div>
      <h1>User Profile</h1>
      <h2>DO It as your homework</h2>
      <ul>
        <li>use auth context to get user details and display it in a card format with profile picture</li>
        <li>add a edit button and delete account button</li>
        <li>use onclick handler to detect user action and then send request to the backend</li>
        <li>make sure that if a user is deleted his memory will be deleted and will be loggedout as well</li>
      </ul>
    </div>
  )
}

export default Profile
