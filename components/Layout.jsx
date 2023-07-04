import Navbar from "./Navbar";
import LoggedInNavbar from "./LoggedInNavbar";
import { authAtom } from "../_state";
import { useRecoilState } from "recoil";
import { Container, Grid } from "@mui/material";

function Layout({ children }) {
  const [auth, setAuth] = useRecoilState(authAtom);

  if (typeof window !== "undefined") {
    console.log("You are on the browser");
    setAuth(localStorage.getItem("Auth Token"));
  }

  return (
    <>
      {auth !== null ? <LoggedInNavbar /> : <Navbar />}
      <Container
        sx={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}
      >
        <Grid container md={10}>
          {children}
        </Grid>
      </Container>
    </>
  );
}

export default Layout;
