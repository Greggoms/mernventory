import styled from "styled-components";

export const RegisterSectionStyles = styled.section`
  width: 100%;
  max-width: 30rem;

  h2 {
    margin-bottom: 1rem;
  }

  .errmsg {
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

    button:enabled {
      cursor: pointer;
    }
    button:disabled {
      cursor: not-allowed;
    }

    .instructions {
      font-size: 0.75rem;
      border-radius: 0.5rem;
      background: #000;
      color: #fff;
      padding: 0.25rem;
      position: relative;
      bottom: -10px;
    }

    .instructions > svg {
      margin-right: 0.25rem;
    }

    .offscreen {
      position: absolute;
      left: -9999px;
    }

    .hide {
      display: none;
    }

    .valid {
      color: limegreen;
      margin-left: 0.25rem;
    }

    .invalid {
      color: red;
      margin-left: 0.25rem;
    }
  }
`;
