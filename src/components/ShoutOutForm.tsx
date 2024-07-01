import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import "./ShoutOutForm.css";
import { addShoutOut, getAllShoutOuts } from "../services/ShoutOutService";
import ShoutOut from "../models/ShoutOut";
import userContext from "../context/UserContext";
import { storage } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props {
  updateList: React.Dispatch<React.SetStateAction<ShoutOut[]>>;
  toName: string | undefined;
}

const ShoutOutForm = ({ updateList, toName }: Props) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [shoutOut, setShoutOut] = useState("");
  const { user } = useContext(userContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [firebasePhotoURL, setFirebasePhotoURL] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newShoutOut: ShoutOut = {
      to,
      from,
      text: shoutOut,
    };
    if (user?.photoURL) {
      newShoutOut.userPhoto = user.photoURL;
    }
    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      //getting image locally:
      const newImage = files[0];
      //send the image to firebase:
      const storageRef = ref(storage, newImage.name);
      // uploadBytes is async
      uploadBytes(storageRef, newImage).then((uploadResult) => {
        //after sending it, wait to get the firebase url
        getDownloadURL(uploadResult.ref).then((url) => {
          setFirebasePhotoURL(url);
        });
      });
    }
    if (firebasePhotoURL) {
      newShoutOut.shoutoutImage = firebasePhotoURL;
    }
    await addShoutOut(newShoutOut);
    await getAllShoutOuts().then((res) => updateList(res));
    setTo("");
    setShoutOut("");
  };

  useEffect(() => {
    if (user) {
      setFrom(user.displayName ?? "");
    } else {
      setFrom("");
    }
  }, [user]);

  return (
    <form
      className="ShoutOutForm"
      onSubmit={(e) => handleSubmit(e)}
      ref={formRef}
    >
      <h2>Leave a Shoutout</h2>
      <label>
        To
        <input
          type="text"
          id="to"
          value={toName ? toName : to}
          onChange={(e) => {
            setTo(e.target.value);
          }}
        />
      </label>
      <label>
        from
        <input
          type="text"
          id="from"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
          }}
          disabled={user?.displayName ? true : false}
        />
      </label>
      <label>
        Shout Out
        <input
          type="text"
          id="shoutOut"
          value={shoutOut}
          onChange={(e) => {
            setShoutOut(e.target.value);
          }}
        />
      </label>
      <label htmlFor="img-upload">Add an Image:</label>
      <input type="file" name="image" id="img-upload" ref={fileInputRef} />
      <button type="submit">Submit Shout Out</button>
    </form>
  );
};

export default ShoutOutForm;
