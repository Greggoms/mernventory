import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Link } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  const isTablet = useMediaQuery("(min-width:700px)");
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          component={RouterLink}
          to="/"
          variant="h4"
          sx={{ textDecoration: "none", color: "text.primary" }}
        >
          Mernventory
        </Link>
        {isTablet ? <Nav /> : <MobileNav />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
