import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Link, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  const isTablet = useMediaQuery("(min-width:700px)");
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">
          <Link
            component={RouterLink}
            to="/"
            variant="inherit"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Mernventory
          </Link>
        </Typography>
        {isTablet ? <Nav /> : <MobileNav />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
