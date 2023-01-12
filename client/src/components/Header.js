import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import logo from "../assets/logo.svg";
function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <img
          src={logo}
          style={{ height: "25px", width: "25px", marginRight: "20px" }}
        />
        <Typography variant="h6" component="div">
          Project Management
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
