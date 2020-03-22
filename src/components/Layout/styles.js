import styled from 'styled-components'
import Button from '../../jh-ui/Button'
import Text from '../../jh-ui/Text'
import ArticleHeading from '../ArticleHeading'

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background);
`

export const SkipLink = styled(Button)`
  position: fixed;
  top: -100%;
  left: 1rem;
  z-index: 3;
  background-color: var(--backgroundInverse);

  &:focus {
    top: 1rem;
  }
`

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  box-shadow: none;
  transition: opacity 0.2s ease-out;
  ${({ mobileMenuExpanded }) => mobileMenuExpanded ? `
    opacity: 0.5;
    pointer-events: none;
  ` : ''}
`

export const AnchoredHeading = styled(ArticleHeading)`
  &::before {
    display: block;
    margin-top: -2rem;
    padding-top: 2rem;
    content: "";
  }
`

export const Link = styled(Text)`
  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
  }
`
