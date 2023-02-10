import { getStorage } from "firebase/storage";
import React, { useState } from "react";
import { db, app, auth } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const Picture = () => {
  const [words, setWords] = useState("");
  const [count, setCount] = useState(0);
  const [imageURL, setImageURL] = useState(null);

  const storage = getStorage();
  const user = auth.currentUser;

  const handleChange = (event) => {
    setWords(event.target.value);
    setCount(event.target.value.split(" ").length);
  };

  async function fetchImage() {
    try {
      const response = await fetch("http://localhost:3002/image-generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: words, user: user.email }),
      });
      const data = await response.json();
      console.log(data, "data");
        setImageURL(data.data);

      const userInfoRef = await db
        .collection("users")
        .doc(`${auth.currentUser.email}`);
      userInfoRef.update({ photo: data.data });



      }
     catch (error) {
      console.error(error);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImage();
  };

  return (
    <div>
      <h3>Enter 6 words to generate an image</h3>
      <input
        type="text"
        value={words}
        onChange={handleChange}
        placeholder="6 words separated by spaces"
      />
      <p>Words Count: {count}</p>
      {count >= 6 ? <button onClick={handleSubmit}>Submit</button> : null}
      {imageURL ? <img src={imageURL} alt="Generated by Dall-E 2" /> : null}
    </div>
  );
};

export default Picture;


  //     const imageName = data.data.split("/").pop().split("?")[0];
  //     const imageRef = ref(storage, `${auth.currentUser.email}-${imageName}`);
