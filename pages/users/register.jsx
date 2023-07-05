import { useState, useEffect } from "react";
import Router from "next/router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth, storage, provider } from "../../config/fire-config";
import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authAtom } from "../../_state";
import { useRecoilValue } from "recoil";

const Register = () => {
  const defaultTheme = createTheme();
  const [err, setErr] = useState(false);
  const userDetails = useRecoilValue(authAtom);
  useEffect(() => {
    if (userDetails !== null) Router.push("/");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let email = data.get("email");
    let password = data.get("password");
    let passConf = data.get("confirm-password");
    if (email === "") {
      alert("Please enter an email");
      return null;
    }
    if (password !== passConf) {
      alert("password doesn't match");
      return null;
    }
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(async (response) => {
        localStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
      });
      Router.push("/");
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="confirm-password"
              type="password"
              id="confirm-password"
              autoComplete="confirm-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/users/login">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Register;
