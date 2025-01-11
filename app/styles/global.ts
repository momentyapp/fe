import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.bg1};
  }

  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 200ms;
  }

  .ReactModal__Overlay--after-open{
    opacity: 1;
  }

  .ReactModal__Overlay--before-close{
    opacity: 0;
  }

  .ReactModal__Content {
    transform: translateY(100%);
    transition: transform 200ms ease-in-out;
  }
  
  .ReactModal__Content--after-open {
    transform: translateY(-20px);
  }

  .ReactModal__Content--before-close {
    transform: translateY(100%);
  }
`;

export default GlobalStyle;
