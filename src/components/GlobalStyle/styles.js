import { createGlobalStyle } from 'styled-components'
import { darkValues, lightValues } from './variables'

export const GlobalStyle = createGlobalStyle`
  :root {
    ${lightValues}

    [data-theme="dark"] {
      ${darkValues}
    }

    .no-js {
      @media (prefers-color-scheme: dark) {
        ${darkValues}
      }
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: border-color 0.2s ease-out, background 0.2s ease-out, color 0.2s ease-out, fill 0.2s ease-out, stroke 0.2s ease-out;
  }

  ::selection {
    background-color: var(--selection);
  }

  pre::selection {
    background-color: rgba(250, 250, 250, 0.15);
  }

  *:focus {
    box-shadow: 0 0 0 0.2em var(--selection);
    outline: 0;
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
    background-color: var(--backgroundInlineCode);
  }

  a {
    text-decoration-color: var(--textLighter);
  }

  .visually-hidden {
    clip: rect(0 0 0 0);
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    margin: -1px;
    padding: 0;
    border: 0;
  }

  .noscript {
    display: block;
    padding: ${({ theme }) => theme.spacing.s};
    font-family: ${({ theme }) => theme.fonts.sansSerif};
    font-size: 16px;
    background-color: var(--accent);
    color: ${({ theme }) => theme.colors.white};
  }

  .tippy-tooltip.jh-theme {
    background-color: var(--backgroundTertiary);
    color: var(--text);

    &[data-placement^='bottom'] {
      .tippy-arrow {
        border-bottom-color: var(--backgroundTertiary);
      }
    }
  }
`