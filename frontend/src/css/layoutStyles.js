import styled from "styled-components";

export const LayoutContainer = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr min-content;
  grid-template-areas:
    "header"
    "content";
  font-family: "Open Sans", sans-serif;

  /* To stretch main content. The rest is in ./index.css */
  height: 100%;

  background: ${(props) => props.theme.grayscaleDarkest};
  width: 100%;
  /* max-width: 100rem; */
  margin: 0 auto;

  .page-content {
    padding: 1rem 2rem;

    h1 {
      text-align: center;
      margin-bottom: 1rem;
    }
  }

  .header {
    grid-area: header;

    h2 {
      color: ${(props) => props.theme.grayscaleLight1};
    }

    a {
      color: ${(props) => props.theme.grayscaleLight1};
      text-decoration: none;
    }

    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 1rem 2rem;
    }
  }

  .main {
    grid-area: content;

    &-content {
      background: ${(props) => props.theme.colorPageBgDark};
      color: ${(props) => props.theme.grayscaleLight1};
      height: 100%;
    }
  }
`;
