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
      <Grid
        container
        md={12}
        xs={12}
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Grid item md={10} xs={12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}

export default Layout;
