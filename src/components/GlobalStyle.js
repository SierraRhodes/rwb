import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
body {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9); /* Slightly off-black background color */
  z-index: -1; /* Place the background behind other content */
}
`;

export default GlobalStyle;