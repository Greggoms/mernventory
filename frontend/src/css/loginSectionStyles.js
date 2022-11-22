import styled from "styled-components";

export const LoginSectionContainer = styled.section`
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  padding: 1rem;

  h1 {
    font-size: 22pt;
    margin-bottom: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .label-group {
      display: flex;
      flex-direction: column;
    }

    input {
      padding: 0.25rem;
    }

    button {
      align-self: flex-start;
      cursor: pointer;
      padding: 0.25rem 1rem;
    }

    .persistCheck input {
      margin-right: 0.5rem;
    }
  }
`;
