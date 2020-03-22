import styled from 'styled-components'

export const Root = styled.div`
  overflow: hidden;
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.elevations.medium};
  transition: all 0.2s ${({ theme }) => theme.beziers.out};

  > * {
    height: 100%;
  }

  &:hover,
  &:active {
    box-shadow: ${({ theme, hover }) => hover ? theme.elevations.high : null};
    transform: ${({ hover }) => hover ? 'translateY(-0.25rem)' : ''};
  }

  &:focus-within {
    box-shadow: ${({ theme, hover }) => hover ? `${theme.elevations.high}, 0 0 0 0.2em var(--selection)` : null};
  }
`
