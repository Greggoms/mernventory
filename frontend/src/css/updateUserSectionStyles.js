import styled from "styled-components";

export const UpdateUserContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 2rem;

  padding: 1rem;

  ul {
    margin-left: 1rem;
  }

  .form-error {
    background-color: lightpink;
    color: firebrick;
    font-weight: bold;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 100%;
    max-width: 30rem;

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
  }
`;
