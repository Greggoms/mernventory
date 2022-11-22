import { useNavigate } from "react-router-dom";
import { UnauthorizedPageContainer } from "../css";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <UnauthorizedPageContainer>
      <h1>Unauthorized</h1>
      <p>You do not have access to the requested page.</p>
      <button onClick={goBack}> &#x2190; Go Back</button>
    </UnauthorizedPageContainer>
  );
};

export default Unauthorized;
