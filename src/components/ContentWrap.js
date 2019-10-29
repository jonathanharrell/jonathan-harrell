import styled from 'styled-components'
import { breakpoints } from '../jh-ui/themes'

const ContentWrap = styled.div`
  max-width: ${breakpoints.desktopLarge};
  margin-right: auto;
  margin-left: auto;
  padding-right: ${({ theme }) => theme.spacing.l};
  padding-left: ${({ theme }) => theme.spacing.l};
  
  @media (min-width: ${breakpoints.mobile}) {
    padding-right: ${({ theme }) => theme.spacing.xxl};
    padding-left: ${({ theme }) => theme.spacing.xxl};
  }
  
  @media (min-width: ${breakpoints.tablet}) {
    padding-right: ${({ theme }) => theme.spacing['2x']};
    padding-left: ${({ theme }) => theme.spacing['2x']};
  }
  
  @media (min-width: ${breakpoints.desktop}) {
    padding-right: ${({ theme }) => theme.spacing['3x']};
    padding-left: ${({ theme }) => theme.spacing['3x']};
  }
`

export default ContentWrap
