import styled from "styled-components";

export const UnauthorizedPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding-top: 2rem;

  button {
    cursor: pointer;
    background: inherit;
    border: 1px solid ${(props) => props.theme.colorLinkLight};
    padding: 0.25rem 1rem;
    color: ${(props) => props.theme.grayscaleLight1};
  }
`;
