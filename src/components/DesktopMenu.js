import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import debounce from 'lodash/debounce'
import styled from 'styled-components'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import ThemeContext from '../context/theme'
import Spaced from '../jh-ui/Spaced'
import { breakpoints } from '../jh-ui/theme'
import Text from '../jh-ui/Text'
import Button from '../jh-ui/Button'
import Sun from '../img/icons/sun.svg'
import Moon from '../img/icons/moon.svg'
import ScreenReaderText from '../jh-ui/ScreenReaderText'

const DesktopMenuWrap = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
  }
`

const MenuLinkWrap = styled.li`
  display: inline-block;
  list-style: none;
`

const MenuLink = styled(Link)`
  text-decoration: none;

  &[data-active] > span {
    color: var(--textLighter) !important;
  }

  &:hover,
  &:focus {
    > span {
      color: var(--textLighter) !important;
    }
  }

  &:active {
    > span {
      color: var(--textLight) !important;
    }
  }
`

const MenuLinkText = styled(Text)`
  transition: all 0.2s ${({ theme }) => theme.beziers.out};
`

const SiteTools = styled.section`
  display: flex;
  align-items: center;
`

const ThemeToggleButton = styled(Button)`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  color: var(--text);

  svg {
    stroke: var(--text);
  }

  &:hover,
  &:focus {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`

const SubscribeButton = styled(Button)`
  .header-background-gray & {
    border-color: var(--textLighter);
  }
`

const DesktopMenu = () => {
  const { themeName, setTheme } = useContext(ThemeContext)
  const [visible, setVisibility] = useState(true)

  useEffect(() => {
    throw new Error('test')
    const rems = breakpoints.desktop.replace('rem', '')
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const desktopWidth = rems * fontSize

    const handleResize = debounce(() => {
      setVisibility(window.innerWidth >= desktopWidth)
    }, 50)

    setVisibility(window.innerWidth >= desktopWidth)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isActive = ({ isCurrent, href, location }) => {
    if (href === '/blog') {
      if (location.pathname.startsWith('/blog')) {
        return { 'data-active': true }
      }

      if (location.pathname.startsWith('/tags')) {
        return { 'data-active': true }
      }
    }

    return isCurrent ? { 'data-active': true } : null
  }

  const toggleTheme = () => {
    setTheme(themeName === 'light' ? 'dark' : 'light')
  }

  const handleSubscribeClick = () => {
    localStorage.removeItem('subscribe-banner-dismissed')
    window.dispatchEvent(new CustomEvent('showSubscribe'))
  }

  return visible ? (
    <DesktopMenuWrap>
      <ScreenReaderText>
        <h2>Main Menu</h2>
      </ScreenReaderText>
      <Spaced left="3x">
        <section aria-labelledby="site-links-label">
          <ScreenReaderText>
            <h3 id="site-links-label">Site Links</h3>
          </ScreenReaderText>
          <nav role="navigation">
            <ul>
              <Spaced right="xxl">
                <MenuLinkWrap>
                  <MenuLink
                    to="/"
                    rel="home"
                    getProps={isActive}
                  >
                    <MenuLinkText order="body" element="span">
                      Home
                    </MenuLinkText>
                  </MenuLink>
                </MenuLinkWrap>
                <MenuLinkWrap>
                  <MenuLink
                    to="/blog"
                    getProps={isActive}
                  >
                    <MenuLinkText order="body" element="span">
                      Articles
                    </MenuLinkText>
                  </MenuLink>
                </MenuLinkWrap>
                <MenuLinkWrap>
                  <MenuLink
                    to="/about"
                    getProps={isActive}
                  >
                    <MenuLinkText order="body" element="span">
                      About
                    </MenuLinkText>
                  </MenuLink>
                </MenuLinkWrap>
              </Spaced>
            </ul>
          </nav>
        </section>
        <SiteTools aria-labelledby="site-tools-label">
          <ScreenReaderText>
            <h3 id="site-tools-label">Site Tools</h3>
          </ScreenReaderText>
          <Spaced left="xl">

            <ThemeToggleButton
              unstyled
              // title={`Change theme to ${themeName === 'light' ? 'dark' : 'light'}`}
              onClick={toggleTheme}
            >
              <ScreenReaderText>
                Change theme to {themeName === 'light' ? 'dark' : 'light'}
              </ScreenReaderText>
              <Tippy
                content={`Change theme to ${themeName === 'light' ? 'dark' : 'light'}`}
                placement="bottom"
                animation="shift-away"
                theme="jh"
              >
                <span>
                {themeName === 'light' ? <Sun/> : <Moon/>}
                </span>
              </Tippy>
            </ThemeToggleButton>
            <SubscribeButton order="secondary" element="a" href="#subscribe" onClick={handleSubscribeClick}>
              Subscribe
            </SubscribeButton>
          </Spaced>
        </SiteTools>
      </Spaced>
    </DesktopMenuWrap>
  ) : null
}

export default DesktopMenu
