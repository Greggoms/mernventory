import styled from "styled-components";

export const NavContainer = styled.nav`
  ul {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    list-style-type: none;
  }
  a,
  button {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
    color: ${(props) => props.theme.colorYellowLight};
    font-size: 12pt;
  }
`;
