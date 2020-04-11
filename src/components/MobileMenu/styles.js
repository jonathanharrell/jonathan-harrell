import styled from 'styled-components'
import { Link } from 'gatsby'
import Button from '../../jh-ui/Button'

export const MobileMenuWrap = styled.div`
  .no-js & {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`

export const MenuButton = styled(Button)`
  background-color: var(--backgroundSecondary);

  &:hover,
  &:focus {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`

export const Menu = styled.div`
  width: 100vw;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  overscroll-behavior-y: contain;
  background-color: var(--backgroundPrimary);
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.elevations.high};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 20rem;
    min-height: 40rem;
  }
`

export const MenuHeader = styled.header`
  position: absolute;
  right: ${({ theme }) => theme.spacing['2x']};
`

export const CloseButton = styled(Button)`
  height: auto;
  margin-left: auto;
  padding: 0.3rem;
  border: 0;
  background-color: var(--backgroundTertiary);
  color: var(--text);
`

export const MenuLinkWrap = styled.li`
  list-style: none;
`

export const MenuLink = styled(Link)`
  display: block;
  text-decoration: none;

  &[data-active] > span {
    color: var(--textLighter);
  }

  &:hover,
  &:focus {
    > span {
      color: var(--textLighter);
    }
  }

  &:active {
    > span {
      color: var(--textLight);
    }
  }
`

export const ThemeOptions = styled.form`
  display: inline-flex;
  align-items: center;
  width: 100%;

  &:focus-within {
    box-shadow: 0 0 0 0.2em var(--selection);
  }
`

export const getThemeOptionBackgroundColor = ({
  active,
  themeName,
  action
}) => {
  if (themeName === 'light') {
    if (active) {
      return 'hsl(0, 0%, 80%)'
    }

    if (action === 'hover' || action === 'focus') {
      return 'hsl(0, 0%, 86%)'
    }

    if (action === 'active') {
      return 'hsl(0, 0%, 88%)'
    }

    return 'hsl(0, 0%, 90%)'
  } else {
    if (active) {
      return 'hsl(0, 0%, 25%)'
    }

    if (action === 'hover' || action === 'focus') {
      return 'hsl(0, 0%, 19%)'
    }

    if (action === 'active') {
      return 'hsl(0, 0%, 17%)'
    }

    return 'hsl(0, 0%, 15%)'
  }
}

export const ThemeOption = styled.label`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.s} 0;
  background-color: ${({ active, themeName }) =>
    getThemeOptionBackgroundColor({ active, themeName })};
  border-radius: 4px;
  text-align: center;
  cursor: ${({ active }) => (active ? 'not-allowed' : 'pointer')};

  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:hover {
    background-color: ${({ active, themeName }) =>
      getThemeOptionBackgroundColor({
        active,
        themeName,
        action: 'hover'
      })};
  }

  &:focus {
    background-color: ${({ active, themeName }) =>
      getThemeOptionBackgroundColor({
        active,
        themeName,
        action: 'focus'
      })};
  }

  &:active {
    background-color: ${({ active, themeName }) =>
      getThemeOptionBackgroundColor({
        active,
        themeName,
        action: 'active'
      })};
  }
`

export const SearchButton = styled(Button)`
  width: 100%;
  height: 3rem;
  border: 0;
  background-color: var(--backgroundTertiary);
  border-radius: 4px;
  text-align: center;
`
