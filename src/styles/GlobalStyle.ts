import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    /* overflow-x: hidden; */
  }

  body {
    background: #FFFFFF;
    color: #232B3B;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }

  h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }

  h1 {
    font-weight: 800;
    color: #2F2C77;
  }

  button {
    cursor: pointer;
  }
`;
