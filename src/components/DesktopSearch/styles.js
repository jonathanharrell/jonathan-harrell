import styled from 'styled-components'
import Button from '../../jh-ui/Button'

export const DesktopSearchWrap = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;

    .no-js & {
      display: none;
    }
  }
`

export const SearchButton = styled(Button)`
  &:hover,
  &:focus {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`

export const SearchWrap = styled.div`
  width: 30rem;
  height: 100vh;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 2rem;
  background: var(--backgroundPrimary);
  box-shadow: ${({ theme }) => theme.elevations.high};
`
