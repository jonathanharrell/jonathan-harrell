import styled from 'styled-components'
import Card from '../../jh-ui/Card'

export const CodepenWrap = styled(Card)`
  position: relative;
  background-color: var(--backgroundElevatedSecondary);
  border-radius: 6px;

  > div {
    display: flex;
    align-items: stretch;
  }
`

export const CodepenLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:focus {
    box-shadow: none;
  }
`

export const CodepenFigure = styled.figure`
  display: none;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
    flex: 0 0 8rem;
  }
`

export const CodepenImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100% !important;
  object-fit: cover;
`
