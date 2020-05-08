import styled from 'styled-components'
import Button from '../../jh-ui/Button'

export const SearchButton = styled(Button)`
  color: var(--text);

  &:hover,
  &:focus {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }

  .no-js & {
    display: none;
  }
`

export const SearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  top: calc(1rem - 5px);
  right: 1rem;
  width: 100vw;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 2rem;
  background: var(--backgroundPrimary);
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.elevations.high};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 20rem;
    min-height: 40rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-height: calc(100vh - 6rem);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    top: 0;
    right: 0;
    width: 30rem;
    min-height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }
`

export const SearchHeader = styled.header`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
`

export const CloseButton = styled(Button)`
  height: auto;
  margin-left: auto;
  padding: 0.3rem;
  border: 0;
  background-color: var(--backgroundTertiary);
  color: var(--text);
`
