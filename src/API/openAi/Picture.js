import React, { useState } from "react";
import { db, app, auth } from "../../firebase";

const Picture = () => {
  const [words, setWords] = useState("");
  const [count, setCount] = useState(0);
  const [image, setImage] = useState(null);

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
        body: JSON.stringify({ message: words }),
      });
      const data = await response.json();
      console.log(data, "data");
        setImage(data.data);

      // Update the user's record in the database
      const userInfoRef = await db
        .collection("users")
        .doc(`${auth.currentUser.email}`);
      userInfoRef.update({ photo: data.data });
    } catch (error) {
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
      {count === 6 ? <button onClick={handleSubmit}>Submit</button> : null}
      {image ? <img src={image} alt="Generated by Dall-E 2" /> : null}
    </div>
  );
};

export default Picture;