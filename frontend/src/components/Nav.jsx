import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { NavContainer } from "../css";

const Nav = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <NavContainer>
      <ul>
        {auth.accessToken && (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <button onClick={signOut}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </NavContainer>
  );
};

export default Nav;
