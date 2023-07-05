import React, { useState, useEffect } from "react";
import {
  AppBar,
  MenuItem,
  Tooltip,
  Button,
  Avatar,
  Container,
  Menu,
  Box,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";

import { MenuIcon } from "@mui/icons-material";

import { authAtom, cartCountAtom } from "../_state";
import { useRecoilState, useRecoilValue } from "recoil";
import { signOut } from "firebase/auth";
import { db, auth, storage, provider } from "../config/fire-config";
import Router from "next/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard"];

function LoggedInNavbar() {
  const [authDetails, setAuthDetails] = useRecoilState(authAtom);
  const cartCount = useRecoilValue(cartCountAtom);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    setOpen(true);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    signOut(auth);
    localStorage.clear();
    setAuthDetails(null);
    Router.push("/users/login");
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              NextJs
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                {open ? "-" : "+"}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={() => Router.push("/food/FoodList")}>
                  <Typography textAlign="center">Food</Typography>
                </MenuItem>
                <MenuItem onClick={() => Router.push("/users/login")}>
                  <Typography textAlign="center">About</Typography>
                </MenuItem>
                <MenuItem onClick={() => Router.push("/users/login")}>
                  <Typography textAlign="center">Blog</Typography>
                </MenuItem>
                <MenuItem onClick={() => Router.push("/users/login")}>
                  <Typography textAlign="center">Create Post</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Next Js
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() => Router.push("/food/FoodList")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Food
              </Button>
              <Button
                onClick={() => Router.push("/users/register")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Blog
              </Button>
              <Button
                onClick={() => Router.push("/users/register")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                About
              </Button>
              <Button
                onClick={() => Router.push("/blog/CreatePostForm")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Create Post
              </Button>
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Box>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  style={{ fill: "white", cursor: "pointer" }}
                >
                  <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
                </svg>
                <span
                  style={{
                    borderRadius: "50%",
                    padding: "2px 5px",
                    backgroundColor: "white",
                    color: "black",
                  }}
                >
                  {cartCount}
                </span>
              </Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ backgroundColor: "white" }}>D</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">LogOut</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default LoggedInNavbar;
