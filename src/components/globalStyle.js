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
    --backgroundSubscribeBanner: ${({ theme }) => theme.colors.white};
    --backgroundCode: ${({ theme }) => theme.colors.blueDarkest};
    --buttonBorderPrimary: ${({ theme }) => theme.colors.blueDarkest};
    --buttonBackgroundPrimary: ${({ theme }) => theme.colors.blueDarkest};
    --buttonTextPrimary: ${({ theme }) => theme.colors.white};
    --buttonBorderSecondary: hsl(210, 15%, 90%);
    --buttonBackgroundSecondary: transparent;
    --buttonTextSecondary: ${({ theme }) => theme.colors.blueDarkest};
    --primary: ${({ theme }) => theme.colors.blueDarkest};
    --accent: ${({ theme }) => theme.colors.red};
    --selection: hsla(210, 67%, 11%, 0.15);
    
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
      --backgroundSubscribeBanner: hsl(0, 0%, 5%);
      --backgroundCode: hsl(0, 0%, 10%);
      --buttonBorderPrimary: ${({ theme }) => theme.colors.white};
      --buttonBackgroundPrimary: transparent;
      --buttonTextPrimary: ${({ theme }) => theme.colors.white};
      --buttonBorderSecondary: hsl(210, 15%, 95%);
      --buttonBackgroundSecondary: transparent;
      --buttonTextSecondary: ${({ theme }) => theme.colors.white};
      --primary: ${({ theme }) => theme.colors.blueDarkest};
      --accent: ${({ theme }) => theme.colors.red};
      --selection: hsla(0, 0%, 100%, 0.15);
    }
  }
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: background-color 0.3s ease-out, color 0.3s ease-out, stroke 0.2s ease-out;
  }
  
  ::selection {
    background-color: var(--selection);
  }
  
  pre ::selection {
    background-color: rgba(250, 250, 250, 0.15);
  }
  
  body {
    min-width: 20rem;
    ${({ withBackground }) => withBackground && 'background-color: var(--backgroundBody)'};
    font-family: ${({ theme }) => theme.fonts.sansSerif};
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
  
  .noscript {
    display: block;
    padding: ${({ theme }) => theme.spacing.s};
    font-family: ${({ theme }) => theme.fonts.sansSerif};
    font-size: 16px;
    background-color: var(--accent);
    color: ${({ theme }) => theme.colors.white};
  }
`

export default GlobalStyle
