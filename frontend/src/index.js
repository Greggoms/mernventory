import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthProvider";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// Uses some outdated packages. Works after slight modifications.
// https://medium.com/neurobit-technologies/creating-dark-theme-using-react-hooks-and-context-in-material-ui-1f42af330913
import { ThemeCtxProvider } from "./context/ThemeContext";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeCtxProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeCtxProvider>
  </React.StrictMode>
);
