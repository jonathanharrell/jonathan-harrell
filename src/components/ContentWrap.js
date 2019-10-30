import styled from 'styled-components'

const ContentWrap = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.desktopLarge};
  margin-right: auto;
  margin-left: auto;
  padding-right: ${({ theme }) => theme.spacing.l};
  padding-left: ${({ theme }) => theme.spacing.l};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-right: ${({ theme }) => theme.spacing.xxl};
    padding-left: ${({ theme }) => theme.spacing.xxl};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-right: ${({ theme }) => theme.spacing['2x']};
    padding-left: ${({ theme }) => theme.spacing['2x']};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-right: ${({ theme }) => theme.spacing['3x']};
    padding-left: ${({ theme }) => theme.spacing['3x']};
  }
`

export default ContentWrap
