import { Link } from 'gatsby'
import styled from 'styled-components'
import Text from '../../jh-ui/Text'
import Button from '../../jh-ui/Button'

export const DesktopMenuWrap = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;

  .no-js & {
    flex: 1 0 auto;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      flex: 1;
    }
  }
`

export const SiteNavigation = styled.section`
  &:focus:not(.focus-visible) {
    box-shadow: none;
  }

  .no-js & {
    margin-top: 0.75rem;
    margin-left: 0 !important;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      margin-top: 0;
      margin-left: 3rem !important;
    }
  }
`

export const MenuLinkWrap = styled.li`
  display: inline-block;
  list-style: none;
`

export const MenuLink = styled(Link)`
  text-decoration: none;

  &[data-active] > span {
    color: var(--textLighter) !important;
  }

  &:hover,
  &:focus {
    > span {
      color: var(--textLighter) !important;
    }
  }

  &:active {
    > span {
      color: var(--textLight) !important;
    }
  }
`

export const MenuLinkText = styled(Text)`
  transition: all 0.2s ${({ theme }) => theme.beziers.out};
`

export const SiteTools = styled.section`
  display: flex;
  align-items: center;
`

export const ThemeToggleButton = styled(Button)`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  color: var(--text);

  svg {
    stroke: var(--text);
  }

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

export const SubscribeButton = styled(Button)`
  background-color: var(--backgroundPrimary);

  .header-background-gray & {
    border-color: var(--textLighter);
    background-color: var(--backgroundSecondary);
  }

  .no-js & {
    display: none;
  }
`
