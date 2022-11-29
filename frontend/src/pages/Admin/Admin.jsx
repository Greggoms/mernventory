import Users from "../../components/Users";
import Register from "../Auth/Register";
import { Container } from "@mui/material";

const Admin = () => {
  return (
    <Container
      sx={{ display: "flex", gap: 2, justifyContent: "space-around", mt: 3 }}
    >
      <Users />
      <Register />
    </Container>
  );
};

export default Admin;
