import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Padded from '../jh-ui/Padded'
import Heading from '../jh-ui/Heading'
import Spaced from '../jh-ui/Spaced'
import ContentWrap from './ContentWrap'
import MobileMenu from './MobileMenu'
import DesktopMenu from './DesktopMenu'

const HeaderWrap = styled.header`
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 4.375rem;

  .no-js & {
    top: 2.6785rem;
    background-color: white;
  }

  ${ContentWrap} {
    height: 100%;
  }
`

const HeaderContentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 100%;
`

const HomePageLink = styled(Link)`
  text-decoration: none;
  color: var(--text);

  .header-background-blue & {
    color: white;
  }

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

const SiteTitle = styled(Heading)`
  font-size: 1.25rem;
  transition: opacity 0.2s ease-out;
  ${({ mobileMenuExpanded }) => mobileMenuExpanded ? `
    opacity: 0.5;
    pointer-events: none;
  ` : ''}
`

const Icon = styled.span`
  display: inline-block;
  font-family: Menlo, Monaco, Consolas, Courier New, monospace;
  font-weight: 600;
  letter-spacing: -1px;
  color: var(--accent);
  transition: transform 0.2s ${({ theme }) => theme.beziers.out};
`

const Header = ({ mobileMenuExpanded, handleMobileMenuExpandedChange }) => {
  return (
    <HeaderWrap aria-label="Site Header">
      <Padded vertical="m">
        <ContentWrap>
          <HeaderContentWrap>
            <SiteTitle
              mobileMenuExpanded={mobileMenuExpanded}
              level={4}
              element="span"
            >
              <HomePageLink to="/" aria-label="Home page" rel="home">
                <Spaced right="xs">
                  <Icon>{`</>`}</Icon>
                </Spaced>
                Jonathan Harrell
              </HomePageLink>
            </SiteTitle>
            <MobileMenu handleExpandedChange={handleMobileMenuExpandedChange}/>
            <DesktopMenu/>
          </HeaderContentWrap>
        </ContentWrap>
      </Padded>
    </HeaderWrap>
  )
}

export default Header
