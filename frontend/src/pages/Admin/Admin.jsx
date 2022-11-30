import Users from "../../components/Users";
import Register from "../Auth/Register";
import { Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const Admin = () => {
  return (
    <Container sx={{ mt: 3 }}>
      <Grid2 container gap={2}>
        <Grid2 xs={12} md={5}>
          <Register />
        </Grid2>
        <Grid2 xs={12} md={5}>
          <Users />
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Admin;
