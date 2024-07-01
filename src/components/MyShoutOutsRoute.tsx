import { useContext, useEffect, useState } from "react";
import { getMyShoutouts } from "../services/ShoutOutService";
import userContext from "../context/UserContext";
import ShoutOut from "../models/ShoutOut";
import { useNavigate } from "react-router-dom";

const MyShoutOutsRoute = () => {
  const [myShoutOuts, setMyShoutouts] = useState<ShoutOut[]>([]);

  const { user } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.displayName) {
      getMyShoutouts(user?.displayName!).then((res) => setMyShoutouts(res));
    } else {
      navigate("/");
    }
  }, [user]);

  setTimeout(() => {
    //user is set async in context
    // therefore, User will always be null for a moment on refresh
    // setTimeout is allowing for that to possibly be set before navigating
    // we'll only navigate after 1 second if user is still null
    if (user === null) {
    }
  }, 1000);

  return (
    <main className="MyShoutOutsRoute">
      <h2>My Shoutouts</h2>
      <ul>
        {myShoutOuts.map((shoutout) => {
          return (
            <>
              <p>To: {shoutout.to}</p>
              <p>{shoutout.text}</p>
            </>
          );
        })}
      </ul>
    </main>
  );
};

export default MyShoutOutsRoute;
