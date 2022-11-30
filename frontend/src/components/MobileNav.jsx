import { useState } from "react";
import Nav from "./Nav";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isExtraSmall = useMediaQuery("(max-width:350px)");

  return (
    <>
      {isExtraSmall ? (
        <MenuIcon
          onClick={() => setIsOpen((prev) => !prev)}
          sx={{ cursor: "pointer" }}
        />
      ) : (
        <Button
          variant="text"
          color="inherit"
          disableElevation={true}
          startIcon={<MenuIcon />}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "Close" : "Menu"}
        </Button>
      )}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            minWidth: "10rem",
            padding: "1rem",
          },
        }}
      >
        <Nav isMobile={true} setIsOpen={setIsOpen} />
      </Drawer>
    </>
  );
};

export default MobileNav;
