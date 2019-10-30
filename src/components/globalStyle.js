import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --text: ${({ theme }) => theme.colors.blueDarkest};
    --textLighter: hsl(210, 15%, 60%);
    --textInverse: hsl(0, 0%, 100%);
    --backgroundPrimary: ${({ theme }) => theme.colors.white};
    --backgroundSecondary: hsl(210, 15%, 95%);
    --backgroundInverse: ${({ theme }) => theme.colors.blueDarkest};
    --backgroundElevatedPrimary: '';
    --backgroundElevatedSecondary: ${({ theme }) => theme.colors.white};
    --backgroundElevatedInverse: ${({ theme }) => theme.colors.blueDarker};
    --backgroundBody: ${({ theme }) => theme.colors.blueDarkest};
    --backgroundPre: ${({ theme }) => theme.colors.blueDarkest};
    --buttonBorderPrimary: ${({ theme }) => theme.colors.blueDarkest};
    --buttonBackgroundPrimary: ${({ theme }) => theme.colors.blueDarkest};
    --primary: ${({ theme }) => theme.colors.blueDarkest};
    --accent: ${({ theme }) => theme.colors.red};
    
    .theme-dark {
      --text: ${({ theme }) => theme.colors.white};
      --textLighter: hsl(0, 0%, 60%);
      --textInverse: ${({ theme }) => theme.colors.white};
      --backgroundPrimary: ${({ theme }) => theme.colors.black};
      --backgroundSecondary: hsl(0, 0%, 10%);
      --backgroundInverse: ${({ theme }) => theme.colors.black};
      --backgroundElevatedPrimary: '';
      --backgroundElevatedSecondary: hsl(0, 0%, 15%);
      --backgroundElevatedInverse: hsl(0, 0%, 10%);
      --backgroundBody: ${({ theme }) => theme.colors.black};
      --backgroundPre: hsl(0, 0%, 5%);
      --buttonBorderPrimary: ${({ theme }) => theme.colors.white};
      --buttonBackgroundPrimary: transparent;
      --primary: ${({ theme }) => theme.colors.blueDarkest};
      --accent: ${({ theme }) => theme.colors.red};
    }
  }
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: background-color 0.3s ease-out, color 0.3s ease-out;
  }
  
  body {
    min-width: 20rem;
    background-color: var(--backgroundBody);
    font-family: 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  
  h1,
  h2,
  h3,
  h4 {
    font-family: "DM Serif Text", serif;
    font-weight: 400 !important;
  }
  
  p a {
    color: var(--text);
  }
  
  p code {
    padding: 0.125rem 0.25rem;
    border-radius: 2px;
    background-color: var(--backgroundSecondary);
  }
`

export default GlobalStyle
