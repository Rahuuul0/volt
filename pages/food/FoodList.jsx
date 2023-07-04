import { useState } from "react";
import { db, auth, storage, provider } from "../../config/fire-config";
import Router from "next/router";
import { useUserActions } from "../../_action";
import {
  Avatar,
  Container,
  Typography,
  Box,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  CssBaseline,
} from "@mui/material";
import FoodCard from "../../components/FoodCard";

const FoodList = () => {
  const list = [1, 2, 3, 4, 5, 6, 7];
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {list.map((items) => {
          return <FoodCard />;
        })}
      </Box>
    </Container>
  );
};
export default FoodList;
