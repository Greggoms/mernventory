import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        mt: 3,
      }}
    >
      <Typography variant="h3" color="error.light">
        Unauthorized
      </Typography>
      <Typography>You do not have access to the requested page.</Typography>
      <Button onClick={goBack}> &#x2190; Go Back</Button>
    </Container>
  );
};

export default Unauthorized;
