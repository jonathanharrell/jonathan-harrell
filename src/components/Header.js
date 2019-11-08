import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import Padded from '../jh-ui/Padded'
import Heading from '../jh-ui/Heading'
import Spaced from '../jh-ui/Spaced'
import ContentWrap from './ContentWrap'
import MobileMenu from './MobileMenu'
import DesktopMenu from './DesktopMenu'

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
`

const Icon = styled.span`
  font-family: Menlo, Monaco, Consolas, Courier New, monospace;
  font-weight: 600;
  letter-spacing: -1px;
  color: var(--accent);
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
    }, 10)

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
            <DesktopMenu/>
          </HeaderContentWrap>
        </ContentWrap>
      </Padded>
    </HeaderWrap>
  )
}

export default Header
