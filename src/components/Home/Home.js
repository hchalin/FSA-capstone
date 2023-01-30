import React, { useEffect, useState } from "react";
import { Box } from "@mui/material/";
import { Navbar } from "../../components";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AddHabit } from "../../components";
import { bgcolor, display } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import RunGuage from "../Guage/Guage";
import { Paper } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Dashboard from "../Dashboard/Dashboard";

const Home = () => {
  return (
    <>
      <Grid container sp>
        <Grid item>
          <Navbar />
        </Grid>
        <Dashboard />
      </Grid>
    </>
  );
};

export default Home;
