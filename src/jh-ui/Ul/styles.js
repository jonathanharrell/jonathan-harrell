import styled from 'styled-components'

export const Root = styled.ul`
  margin-left: 1rem;
  list-style: disc;
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme }) => theme.fontSizes.m.mobile};
  line-height: 1.5;
  color: ${({ color }) => `var(--${color})`};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.m.tablet};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.m.desktop};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`
