import { useNavigate, Link as RouterLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useThemeMode } from "../context/ThemeContext";
import {
  Stack,
  Button,
  Tooltip,
  Link,
  FormControlLabel,
  Switch,
} from "@mui/material";

// isMobile is defined in MobileNav.jsx
const Nav = ({ isMobile, setIsOpen }) => {
  const { darkMode, handleDarkMode } = useThemeMode();

  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        alignItems={isMobile ? "flex-start" : "center"}
      >
        {auth.accessToken && (
          <>
            <Link
              component={RouterLink}
              to="/profile"
              sx={{ color: "text.primary" }}
              onClick={() => isMobile && setIsOpen(false)}
            >
              Profile
            </Link>
            <Link
              component={RouterLink}
              to="/admin"
              sx={{ color: "text.primary" }}
              onClick={() => isMobile && setIsOpen(false)}
            >
              Admin
            </Link>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                signOut();
                isMobile && setIsOpen(false);
              }}
            >
              Logout
            </Button>
          </>
        )}
        {/* Toggle dark theme component */}
        <Tooltip title="Toggle dark mode">
          <FormControlLabel
            sx={isMobile ? { marginTop: "3rem" } : { marginTop: 0 }}
            control={
              <Switch checked={darkMode} onClick={() => handleDarkMode()} />
            }
            label={darkMode ? "Dark Mode" : "Light Mode"}
          />
        </Tooltip>
      </Stack>
    </>
  );
};

export default Nav;
