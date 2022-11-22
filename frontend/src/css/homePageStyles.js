import styled from "styled-components";

export const HomePageContainer = styled.section`
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .select-boxes {
    display: flex;
    justify-content: center;
    gap: 3rem;
  }
  .selection-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .from-shop-selection {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
  }
  .submit-btn {
    align-self: center;

    cursor: pointer;
    border: none;
    border-radius: 0.5rem;
    background: ${(props) => props.theme.colorPurple};
    color: ${(props) => props.theme.grayscaleLight1};
    padding: 1rem;
    font-size: 14pt;

    transition: all 0.3s ease;
  }

  .submit-btn:hover {
    filter: brightness(1.1);
  }

  .no-data {
    text-align: center;
    margin-top: 6rem;
  }

  .form-error {
    color: ${(props) => props.theme.colorRed};
  }
`;
