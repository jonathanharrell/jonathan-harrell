import styled from 'styled-components'

export const SectionHeaderWrap = styled.header`
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
      margin-bottom: 0;
    }
  }
`
