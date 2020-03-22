import styled from 'styled-components'
import Card from '../../jh-ui/Card'

export const ArticleLinkWrap = styled(Card)`
  position: relative;
  background-color: var(--backgroundCode);
  border-radius: 6px;

  > div {
    display: flex;
    align-items: stretch;
  }
`

export const ArticleLinkLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:focus {
    box-shadow: none;
  }
`

export const ArticleLinkFigure = styled.figure`
  position: relative;
  flex: 0 0 10rem;
  background-color: var(--backgroundPrimary);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 0 8rem;
  }

  svg {
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 100% !important;
    transform: translateY(-50%);
  }
`
