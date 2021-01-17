import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body, html {
    background-color: #f4f4f2;
    width: 100%;
    height: 100vh;
    font-family: 'Inter', 'sans-serif';
    overflow: hidden;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: rgb(32, 34, 35);
  }

  ::-webkit-scrollbar {
    width: 12px;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px 10px transparent;
    border: solid 5px transparent;
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 10px 10px lightgrey;
    border: solid 3px transparent;
    border-radius: 5px;
  }
`;

export default GlobalStyles;