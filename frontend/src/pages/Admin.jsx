import Users from "../components/Users";
import Register from "../components/Register";
import { AdminPageContainer } from "../css";

const Admin = () => {
  return (
    <AdminPageContainer>
      <Users />
      <Register />
    </AdminPageContainer>
  );
};

export default Admin;
