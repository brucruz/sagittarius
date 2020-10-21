import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
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
    font-weight: 700;
    font-size: 32px;
    line-height: 32px;
    letter-spacing: 0.192941px;

    color: #2F2C77;
  }

  h2 {
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 34px;
    /* identical to box height, or 142% */

    letter-spacing: 0.192941px;

    /* Azul Heali */

    color: #2F2C77;
  }

  h3 {
    font-weight: 700;
    font-size: 16px;
    line-height: 32px;
    letter-spacing: 0.192941px;

    color: #232B3B;
  }

  button {
    cursor: pointer;

    border: 0;
    background-color: transparent;
  }
`;
