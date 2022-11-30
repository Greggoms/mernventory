import { Container } from "@mui/material";
import InventoryCompare from "../../components/InventoryCompare";

const Home = () => {
  return (
    <Container sx={{ py: 5 }} maxWidth={false}>
      <InventoryCompare />
    </Container>
  );
};

export default Home;
