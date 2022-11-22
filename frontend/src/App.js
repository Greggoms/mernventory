import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import Unauthorized from "./pages/Unauthorized";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "./css/theme";

const ROLES = {
  User: 2001,
  Admin: 5150,
};

function App() {
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
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

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Streches main content to keep footer at the bottom. */
html,
body,
#root,
main {
  height: 100%;
}

html {
  /* background-color: ${theme.grayscaleDarkest}; */
  background-size: cover;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  font: 112.5%/1.45em;
}

@media only screen and (max-width: 480px) {
  html {
    font-size: 100%;
  }
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: normal;
  word-wrap: break-word;
  font-kerning: normal;
  font-feature-settings: "kern", "liga", "clig", "calt";
  -webkit-font-smoothing: antialiased;
  -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings: "kern", "liga", "clig", "calt";
  -ms-font-feature-settings: "kern", "liga", "clig", "calt";
}
`;
