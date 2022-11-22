import { Outlet } from "react-router-dom";
import Header from "./Header";
import { LayoutContainer } from "../css";

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <main className="main">
        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </LayoutContainer>
  );
};

export default Layout;
