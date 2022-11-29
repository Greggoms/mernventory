import { useState } from "react";
import Nav from "./Nav";
import { Box } from "@mui/system";
import { Button, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box>
      <Button
        variant="contained"
        disableElevation={true}
        startIcon={<MenuIcon />}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "Close" : "Menu"}
      </Button>
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
    </Box>
  );
};

export default MobileNav;
