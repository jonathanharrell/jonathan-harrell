import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
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
  ${({ scrolled }) => scrolled ? 'box-shadow: 0 2px 28px rgba(0, 0, 0, 0.15);' : ''}
`

const HeaderContentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`

const HomePageLink = styled(Link)`
  text-decoration: none;
  color: var(--text);
`

const SiteTitle = styled(Heading)`
  position: relative;
  z-index: 1;
  font-size: 1.25rem;
  transform-origin: 0 0;
  ${({ scrolled }) => scrolled ? 'transform: scale(0.9)' : ''};
  transition: all 0.1s ease-out;
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

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (document.documentElement.scrollTop > 25) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }, 25)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <HeaderWrap scrolled={scrolled} aria-label="Site Header">
      <Padded vertical="m">
        <ContentWrap>
          <HeaderContentWrap>
            <SiteTitle level={4} element="span" scrolled={scrolled}>
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

export default Header
