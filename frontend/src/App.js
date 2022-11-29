import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./utils/RequireAuth";
import PersistLogin from "./pages/Auth/PersistLogin";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Profile/Profile";
import NotFoundPage from "./pages/NotFound/NotFound";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useThemeMode } from "./context/ThemeContext";

const ROLES = {
  User: 2001,
  Admin: 5150,
};

function App() {
  const { darkMode } = useThemeMode();
  let theme = useMemo(() => {
    return createTheme({ palette: { mode: darkMode ? "dark" : "light" } });
  }, [darkMode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="login" element={<Login />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* protected routes */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="admin" element={<Admin />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>

            {/* catch all */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
