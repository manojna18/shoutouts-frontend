import { useEffect, useState } from "react";
import ShoutOut from "../models/ShoutOut";
import "./ShoutOutList.css";
import { deleteShoutOut, getAllShoutOuts } from "../services/ShoutOutService";
import ShoutOutForm from "./ShoutOutForm";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";

const ShoutOutList = () => {
  const [shoutOutsList, setShoutOutList] = useState<ShoutOut[]>([]);
  const receiverName = useParams().name;
  console.log(receiverName);
  useEffect(() => {
    if (receiverName) {
      getAllShoutOuts(receiverName).then((res) => setShoutOutList(res));
    } else {
      getAllShoutOuts().then((res) => {
        setShoutOutList(res);
        console.log(res);
      });
    }
  }, [receiverName]);

  const handleDelete = async (id: string) => {
    await deleteShoutOut(id);
    const res = await getAllShoutOuts();
    setShoutOutList(res);
  };

  return (
    <>
      <Header />
      <ShoutOutForm updateList={setShoutOutList} toName={receiverName} />
      <div className="ShoutOutList">
        {receiverName ? (
          <>
            <h2>Shout out to {receiverName}</h2>
            <Link to="/">Back to all Shoutouts</Link>
          </>
        ) : (
          <h2>All Shout Outs</h2>
        )}
        <ul>
          {shoutOutsList.map((shoutOut) => {
            return (
              <li key={shoutOut._id}>
                <h3>
                  Shout out to{" "}
                  <Link to={`/user/${encodeURIComponent(shoutOut.to)}`}>
                    {shoutOut.to}
                  </Link>
                </h3>
                <div className="from-info">
                  <p>- from {shoutOut.from}</p>
                  {shoutOut.userPhoto && (
                    <img
                      src={shoutOut.userPhoto}
                      alt={shoutOut.from}
                      className="user-photo"
                    />
                  )}
                </div>
                <p>{shoutOut.text}</p>
                <img src={shoutOut.shoutoutImage} id="img-upload" />
                <button
                  onClick={() => {
                    handleDelete(shoutOut._id!);
                  }}
                >
                  🗑️
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ShoutOutList;
