import { Link } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/">
          <h2>company-portal</h2>
        </Link>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
