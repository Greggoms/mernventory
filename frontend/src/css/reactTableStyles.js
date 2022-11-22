import styled from "styled-components";

export const TableContainer = styled.table`
  width: 100%;
  margin: 1rem auto;
  border-collapse: collapse;
  position: relative;

  th {
    position: sticky;
    top: 0;

    cursor: pointer;
    background: ${(props) => props.theme.colorGreen};
    color: ${(props) => props.theme.grayscaleDarkest};
    border-bottom: 1px solid ${(props) => props.theme.grayscaleLight1};
  }
  th,
  td {
    padding: 0.5rem;
  }

  tbody tr:hover {
    background: ${(props) => props.theme.grayscaleDark2};
    color: ${(props) => props.theme.grayscaleLight1};
  }
  tbody tr {
    font-weight: 700;
    border-bottom: 1px solid ${(props) => props.theme.grayscaleLight1};
  }

  a {
    color: ${(props) => props.theme.colorLinkLight};
  }
  a:visited {
    color: ${(props) => props.theme.colorLinkDark};
  }
`;

export const ColumnVisibilityContainer = styled.section`
  margin: 0 auto;

  h3 {
    margin-bottom: 5px;
  }
  .label-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .toggle-all {
    border: 2px solid ${(props) => props.theme.grayscaleLight1};
  }
  label {
    display: grid;
    justify-content: flex-start;
    cursor: pointer;
    padding: 8px;
    border-radius: 5px;
  }
  input,
  p {
    grid-column: 1;
    grid-row: 1;
  }
  p {
    z-index: 1;
    background: ${(props) => props.theme.colorPageBgDark};
  }
`;
