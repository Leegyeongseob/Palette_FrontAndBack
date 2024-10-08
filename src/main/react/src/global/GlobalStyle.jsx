import { createGlobalStyle } from "styled-components";
// 글로벌 스타일링
export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @font-face {
  font-family: 'HancomSans-Light_0';
  src: url('./font/HancomSans-Light_0.ttf') format('truetype');
}
`;

export default GlobalStyle;
