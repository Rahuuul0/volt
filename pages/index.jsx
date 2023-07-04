import { useState, useEffect } from "react";
import Head from "next/head";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import CreatePost from "../components/CreatePost";
import Link from "next/link";
import Router from "next/router";
import { db, auth, storage, provider } from "../config/fire-config";
import { authAtom } from "../_state";
import { useRecoilValue } from "recoil";
import { Container, Grid, Box, Typography } from "@mui/material";

const HomePage = () => {
  const authDetails = useRecoilValue(authAtom);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState("");

  const postsCollectionRef = collection(db, "blog");

  const authStatus = () => {
    if (authDetails) {
      Router.push("/");
    }
    if (!authDetails) {
      Router.push("/users/login");
    }
  };

  useEffect(() => {
    authStatus();
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Head>
        <title>Blog App</title>
      </Head>
      <Box>
        <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
          Blog
        </Typography>
        {notification}

        {blogs.map((blog) => {
          let content = blog.content.substring(0, 200) + "...";
          return (
            <Box sx={{ marginBottom: "0.7rem" }}>
              <Typography variant="h4" key={blog.id}>
                <Link
                  href="/blog/[id]"
                  as={"/blog/" + blog.id}
                  style={{ textDecoration: "none" }}
                >
                  {blog.title}
                </Link>
              </Typography>
              <Typography>{content}</Typography>
              <Typography variant="h6" sx={{ color: "#666" }}>
                January 2, 2022
              </Typography>
            </Box>
          );
        })}

        {/* <CreatePost /> */}
      </Box>
    </Grid>
  );
};
export default HomePage;
