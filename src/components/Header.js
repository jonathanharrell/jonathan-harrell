import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import ContentWrap from './ContentWrap'
import Padded from '../jh-ui/Padded'
import Heading from '../jh-ui/Heading'
import MobileMenu from './MobileMenu'
import Spaced from '../jh-ui/Spaced'

const HeaderWrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: var(--backgroundPrimary);
`

const HeaderContentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`

const SiteTitle = styled(Heading)`
  position: relative;
  z-index: 1;
  font-size: 1.25rem;
`

const HomePageLink = styled(Link)`
  text-decoration: none;
  color: var(--text);
`

const Icon = styled.span`
  font-family: Menlo, Monaco, Consolas, Courier New, monospace;
  font-weight: 600;
  letter-spacing: -1px;
  color: var(--accent);
`

const MenuLink = styled(Link)`
  text-decoration: none;
  color: var(--text);
`

class Header extends React.Component {
  render() {
    return (
      <HeaderWrap aria-label="Site Header">
        <Padded vertical="m">
          <ContentWrap>
            <HeaderContentWrap>
              <SiteTitle level={4} element="span">
                <HomePageLink to="/" aria-label="Home page" rel="home">
                  <Spaced right="xs">
                    <Icon>{`</>`}</Icon>
                  </Spaced>
                  Jonathan Harrell
                </HomePageLink>
              </SiteTitle>
              <MobileMenu/>
            </HeaderContentWrap>
            <noscript>
              <nav role="navigation">
                <Spaced right="xl">
                  <MenuLink to="/" rel="home">
                    Home
                  </MenuLink>
                  <MenuLink to="/blog">
                    Articles
                  </MenuLink>
                  <MenuLink to="/about">
                    About
                  </MenuLink>
                </Spaced>
              </nav>
            </noscript>
          </ContentWrap>
        </Padded>
      </HeaderWrap>
    )
  }
}

export default Header
