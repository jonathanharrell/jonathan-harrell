import styled from 'styled-components'
import { Link } from 'gatsby'
import ContentWrap from '../ContentWrap/'
import Heading from '../../jh-ui/Heading'

export const HeaderWrap = styled.header`
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 4.375rem;

  ${ContentWrap} {
    height: 100%;
  }

  .no-js & {
    top: 2.6875rem;
  }
`

export const HeaderContentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 100%;
`

export const HomePageLink = styled(Link)`
  text-decoration: none;
  color: var(--text);

  &:hover,
  &:focus {
    span {
      transform: rotate(-10deg);
    }
  }

  &:active {
    span {
      transform: rotate(-5deg);
    }
  }
`

export const SiteTitle = styled(Heading)`
  font-size: 1.25rem;
`

export const Icon = styled.span`
  display: inline-block;
  font-family: Menlo, Monaco, Consolas, Courier New, monospace;
  font-weight: 600;
  letter-spacing: -1px;
  color: var(--accent);
  transition: transform 0.2s ${({ theme }) => theme.beziers.out};
`
