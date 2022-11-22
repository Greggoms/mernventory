import styled, { keyframes } from "styled-components";
import { theme } from "./theme";

const rotate = keyframes`
from {
    border: 5px dotted ${theme.colorLinkDark};
    transform: rotate(0deg);
}
to {
    border: 5px dotted ${theme.colorPurple};
  transform: rotate(360deg);
}
`;

export const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  height: 100%;
  color: ${(props) => props.theme.grayscaleLight1};

  .spinner-icon {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;

    animation: ${rotate} 4s linear infinite;
  }
`;
