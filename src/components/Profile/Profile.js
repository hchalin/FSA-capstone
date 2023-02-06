import React, { useEffect, useState } from "react";
import { Box } from "@mui/material/";
import { auth, app } from "../../firebase";
import Avatar from "@mui/material/Avatar";
import ImageUploader from "./ImageUploader";

const Profile = () => {

    const user = auth.currentUser
   
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [habits, setHabits] = useState([]);

  useEffect(() => {
    const data = [];
    console.log("USEEFFECT", auth.currentUser)
    app
      .firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          let data = snapshot.data();
          if (
            String(data.email).toLowerCase() ===
            auth.currentUser.email.toLowerCase()
          ) {
            setName(data.name);
            setAge(data.age);
            setPhone(data.phone);
          }
        });
      });
    app
      .firestore()
      .collection("users")
      .doc(`${auth.currentUser.email}`)
      .collection("habits")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          let habit = {
            id: doc.id,
            title: doc.data().title,
            goal: doc.data().goal,
            progress: doc.data().progress,
            due: doc.data().due.toDate(),
          };
          data.push(habit);
          setHabits(data);
        });
      });
  }, []);


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "90vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "white",
          border: "2px solid grey",
          borderRadius: "15px",
          alignItems: "center",
          justifyContent: "space-around",
          height: "40rem",
          width: "60rem",
          backgroundImage: "linear-gradient(20deg, #2087f7 0%, #3358f4 100%)",
          boxShadow: "3px 3px 20px black",
        }}
      >
        
        <Avatar src={user.photoURL} sx={{ width: 150, height: 150 }} />
        <ImageUploader/>
        <Box>Name: {name}</Box>  
        <Box>Age: {age}</Box>
        <Box>Phone: {phone}</Box>
        <Box>Email: {auth.currentUser.email}</Box>
        <Box>Habits: {habits.length}</Box>
        <Box>Joined: {(auth.currentUser.metadata.creationTime).slice(0,16)}</Box>

      </Box>
    </Box>
  );
};

export default Profile;
