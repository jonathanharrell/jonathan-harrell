import styled from 'styled-components'

export const SectionHeaderWrap = styled.header`
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
  }

  [class^=Heading] {
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
      margin-bottom: 0;
    }
  }
`
