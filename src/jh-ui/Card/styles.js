import styled from 'styled-components'

export const Root = styled.div`
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 6px;
  transition: all 0.2s ${({ theme }) => theme.beziers.out};

  > * {
    height: 100%;
  }

  &:hover,
  &:active {
    box-shadow: ${({ theme, hoverable }) =>
      hoverable ? theme.elevations.high : null};
    transform: ${({ hoverable }) => (hoverable ? 'translateY(-0.25rem)' : '')};
  }

  &:focus-within {
    box-shadow: ${({ theme, hoverable }) =>
      hoverable
        ? `${theme.elevations.high}, 0 0 0 0.2em var(--selection)`
        : null};
  }
`
