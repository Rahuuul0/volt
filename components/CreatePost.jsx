import React, { useState } from "react";
import { db } from "../config/fire-config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {
  Grid,
  Button,
  Box,
  TextField,
  Typography,
  FormControl,
  Paper,
} from "@mui/material";
import Router from "next/router";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState("");
  const postsCollectionRef = collection(db, "blog");

  const handleSubmit = async (event) => {
    alert("Adsfadf");
    event.preventDefault();
    await addDoc(postsCollectionRef, {
      title,
      content,
    });
    setTitle("");
    setContent("");
    Router.push("/");
  };
  return (
    <Paper sx={{ padding: "1.2rem" }}>
      <Typography variant="h2">Add Blog</Typography>
      {notification}
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        fullWidth
        sx={{ display: "flex", flexDirection: "Column", gap: "1rem" }}
      >
        <TextField
          label="Title"
          fullWidth
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <TextField
          label="Content"
          fullWidth
          multiline
          rows={12}
          value={content}
          variant="filled"
          onChange={({ target }) => setContent(target.value)}
        />
        <Grid item md={2} xs={6}>
          <Button variant="contained" type="submit" fullWidth>
            Save
          </Button>
        </Grid>
      </Box>
    </Paper>
  );
};
export default CreatePost;
