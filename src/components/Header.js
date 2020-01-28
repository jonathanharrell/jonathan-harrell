import React, { useEffect, useState } from 'react'
import BodyClassName from 'react-body-classname'
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
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  ${({ scrolled }) => scrolled ? `
    background-color: var(--backgroundPrimary);
    box-shadow: 0 2px 28px rgba(0, 0, 0, 0.15);
  ` : ''}
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

  .header-background-blue:not(.scrolled):not(.mobile-menu-expanded) & {
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
  position: relative;
  z-index: 1;
  font-size: 1.25rem;
`

const Icon = styled.span`
  display: inline-block;
  font-family: Menlo, Monaco, Consolas, Courier New, monospace;
  font-weight: 600;
  letter-spacing: -1px;
  color: var(--accent);
  transition: transform 0.2s ${({ theme }) => theme.beziers.out};
`

const Header = ({ handleMobileMenuExpandedChange }) => {
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
      <BodyClassName className={scrolled ? 'scrolled' : ''}/>
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
            <MobileMenu handleExpandedChange={handleMobileMenuExpandedChange}/>
            <DesktopMenu/>
          </HeaderContentWrap>
        </ContentWrap>
      </Padded>
    </HeaderWrap>
  )
}

export default Header
