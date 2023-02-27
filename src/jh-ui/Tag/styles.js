import styled from 'styled-components'

export const Root = styled.span`
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  background-color: var(--backgroundSecondary);
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-weight: 500;
  text-decoration: none;
  color: var(--textLighter);

  &:hover,
  &:focus {
    ${({ hoverable }) =>
      hoverable === 'true'
        ? `
          background-color: var(--backgroundTertiary);
          cursor: pointer;
        `
        : ''}
  }
`
