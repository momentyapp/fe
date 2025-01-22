import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.bg1};
  }

  .ReactModal__Overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 200ms;
  }

  .ReactModal__Overlay--after-open{
    opacity: 1;
  }

  .ReactModal__Overlay--before-close{
    opacity: 0;
  }

  .ReactModal__Content {
    position: fixed;
    left: 20px;
    right: 20px;
    bottom: 0px;
    display: flex;
    padding: 30px 0px;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    gap: 10px;
    border-radius: 20px;
    transform: translateY(100px);
    transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
  }
  
  .ReactModal__Content--after-open {
    transform: translateY(-20px);
  }

  .ReactModal__Content--before-close {
    transform: translateY(100px);
    opacity: 0;
  }
`;

export default GlobalStyle;
