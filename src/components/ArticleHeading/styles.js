import styled from 'styled-components'

export const HeadingWrap = styled.div`
  position: relative;
  z-index: 0 !important;
`

export const HeadingLink = styled.a`
  display: none;
  position: absolute;
  top: 2rem;
  padding-top: 0.5rem;
  color: var(--textLighter);
  text-decoration: none;
  transform: translateX(calc(-100% - 0.5rem));

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  }

  svg {
    width: 1.5rem !important;
    height: 1.5rem !important;
    pointer-events: none;
  }

  &:hover,
  &:focus {
    svg {
      transform: scale(1.1);
    }
  }

  &:focus {
    box-shadow: none;
  }

  &:focus-within {
    svg {
      box-shadow: 0 0 0 0.2em var(--selection);
    }
  }

  &:active {
    svg {
      transform: scale(0.98);
    }
  }
`
