import { useContext } from "react";
import { signInWithGoogle, signOutOfGoogle } from "../firebaseConfig";
import "./Header.css";
import userContext from "../context/UserContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(userContext);
  console.log(user);

  return (
    <div className="Header">
      <h1>Shoutouts App</h1>
      {user === null ? (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      ) : (
        <>
          <p>Welcome, {user.displayName}</p>
          <img
            src={user.photoURL ?? ""}
            alt={user.displayName ?? ""}
            className="user-photo"
          />
          <Link to="/me">See my shoutouts</Link>
          <button onClick={signOutOfGoogle}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default Header;
