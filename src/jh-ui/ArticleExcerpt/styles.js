import styled from 'styled-components'
import Card from '../Card'
import { Link as GatsbyLink } from 'gatsby'

export const ArticleCard = styled(Card)`
  position: relative;
`

export const Link = styled(GatsbyLink)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;

  &:focus {
    box-shadow: none;
  }
`

export const CardContent = styled.div`
  height: 100%;
`

export const ImageWrap = styled.figure`
  position: relative;
  overflow: hidden;
  padding: 25% 0;
  background-color: var(--backgroundSecondary);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 30% 0;
  }

  svg {
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: auto;
    transform: translateY(-50%);
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
