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
    z-index: 1000;
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
    transform: translateY(30px);
    transition: transform 300ms cubic-bezier(0.17,0.84,0.44,1), opacity 300ms;
    z-index: 1001;
  }
  
  .ReactModal__Content--after-open {
    transform: translateY(-20px);
  }

  .ReactModal__Content--before-close {
    opacity: 0;
    transform: translateY(30px);
  }
`;

export default GlobalStyle;
