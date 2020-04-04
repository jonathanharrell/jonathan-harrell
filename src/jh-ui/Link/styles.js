import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

export const Root = styled(GatsbyLink)`
  display: inline-flex;
  align-items: center;
  height: ${({ theme }) => theme.fontSizes.m.mobile};
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme }) => theme.fontSizes.m.mobile};
  text-decoration: none;
  color: var(--accent);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: ${({ theme }) => theme.fontSizes.m.tablet};
    font-size: ${({ theme }) => theme.fontSizes.m.tablet};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: ${({ theme }) => theme.fontSizes.m.desktop};
    font-size: ${({ theme }) => theme.fontSizes.m.desktop};
  }

  &:hover,
  &:focus,
  &:focus-within,
  &:active {
    color: ${({ theme }) => theme.colors.redDark};

    .arrow {
      transform: ${({ arrow }) =>
        arrow === 'left' ? 'translateX(-0.1em)' : 'translateX(0.1em)'};
    }
  }

  .arrow {
    transition: transform 0.2s ${({ theme }) => theme.beziers.out};
  }
`
