import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import Button from '../jh-ui/Button'
import Text from '../jh-ui/Text'
import ContentWrap from './ContentWrap'
import Heading from '../jh-ui/Heading'
import Padded from '../jh-ui/Padded'
import Spaced from '../jh-ui/Spaced'
import ThemeContext from '../context/theme'
import ScreenReaderText from '../jh-ui/ScreenReaderText'
import { breakpoints } from '../jh-ui/theme'

const MobileMenuWrap = styled.div`
  .no-js & {
    display: none;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`

const ToggleButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  height: 1.75rem;
  overflow: hidden;
  
  ${({ expanded }) => expanded ? (`
    span:nth-of-type(2) {
      transform: rotate(45deg) translate(2px, 3px);
    }

    span:nth-of-type(3) {
      display: none;
    }
    
    span:nth-of-type(4) {
      transform: rotate(-45deg) translate(2px, -3px);
    }
  `) : ''};
`

const Bar = styled.span`
  display: block;
  width: 22px;
  height: 2px;
  margin: 5px;
  border-radius: 4px;
  background-color: var(--text);
  transition: all 0.2s ease-out;
`

const Menu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  background-color: var(--backgroundSecondary);
`

const MenuLink = styled(Link)`
  display: block;
  text-decoration: none;
`

const ThemeOptions = styled.form`
  display: flex;
  align-items: center;
`

const getThemeOptionBackgroundColor = ({ active, themeName }) => {
  if (themeName === 'light') {
    return active ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 90%)'
  } else {
    return active ? 'hsl(0, 0%, 25%)' : 'hsl(0, 0%, 15%)'
  }
}

const ThemeOption = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing['4x']};
  background-color: ${({ active, themeName }) => getThemeOptionBackgroundColor({ active, themeName })};
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  
  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

const MobileMenu = () => {
  const { themeName, setTheme } = useContext(ThemeContext)
  const [visible, setVisibility] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const toggleButtonRef = useRef()
  const firstTabbableElementRef = useRef()
  const lastTabbableElementRef = []

  useEffect(() => {
    const rems = breakpoints.desktop.replace('rem', '')
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const desktopWidth = rems * fontSize

    const handleResize = debounce(() => {
      setVisibility(window.innerWidth < desktopWidth)
    }, 300)

    setVisibility(window.innerWidth < desktopWidth)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (visible) {
      if (expanded) {
        // when menu is opened, fix body to prevent scrolling outside menu
        document.body.style.top = `-${window.scrollY}px`
        document.body.style.position = 'fixed'
        // focus first link
        firstTabbableElementRef.current.focus()
      } else {
        // when menu is closed, reset body to original scroll position
        const scrollY = document.body.style.top
        document.body.style.position = ''
        document.body.style.top = ''
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
        // focus toggle button
        toggleButtonRef.current.focus()
      }
    }
  }, [visible, expanded])

  const setLastTabbableElementRef = element => {
    lastTabbableElementRef.push(element)
  }

  const isActive = ({ isCurrent }) => {
    return isCurrent ? { style: { opacity: 0.5 } } : null
  }

  const handleKeydown = event => {
    if (!expanded) return

    // if tabbing from last link, force toggle button to get focus
    if (event.key === 'Tab' && !event.shiftKey) {
      if (lastTabbableElementRef.includes(event.target)) {
        event.preventDefault()
        toggleButtonRef.current.focus()
      }
    }

    // if tabbing backwards from toggle button, force last link to get focus
    if (event.key === 'Tab' && event.shiftKey) {
      if (event.target === toggleButtonRef.current) {
        event.preventDefault()
        lastTabbableElementRef[lastTabbableElementRef.length - 1].focus()
      }
    }

    // close menu on escape
    if (event.key === 'Escape') {
      setExpanded(false)
    }
  }

  const toggleVisibility = () => {
    setExpanded(!expanded)
  }

  const handleThemeChange = event => {
    setTheme(event.target.value)
  }

  return visible ? (
    <MobileMenuWrap onKeyDown={handleKeydown}>
      <ToggleButton
        ref={toggleButtonRef}
        unstyled={true}
        expanded={expanded}
        aria-expanded={expanded}
        aria-controls="main-menu"
        onClick={toggleVisibility}
      >
        <ScreenReaderText>
          Main Menu
        </ScreenReaderText>
        <Bar/>
        <Bar/>
        <Bar/>
      </ToggleButton>
      {expanded && (
        <Menu id="main-menu" aria-label="Main Menu">
          <Padded top="4x" bottom="2x">
            <ContentWrap>
              <Spaced vertical="3x">
                <section aria-label="Site Links">
                  <h2>
                    <Text order="meta">Links</Text>
                  </h2>
                  <nav role="navigation">
                    <Spaced vertical="l">
                      <MenuLink
                        to="/"
                        rel="home"
                        ref={firstTabbableElementRef}
                        getProps={isActive}
                      >
                        <Heading level={1} element="span">
                          Home
                        </Heading>
                      </MenuLink>
                      <MenuLink
                        to="/blog"
                        getProps={isActive}
                      >
                        <Heading level={1} element="span">
                          Articles
                        </Heading>
                      </MenuLink>
                      <MenuLink
                        to="/about"
                        getProps={isActive}
                      >
                        <Heading level={1} element="span">
                          About
                        </Heading>
                      </MenuLink>
                    </Spaced>
                  </nav>
                </section>
                <section aria-label="Theme Settings">
                  <h2>
                    <Text order="meta">Change Theme</Text>
                  </h2>
                  <Spaced top="s">
                    <ThemeOptions>
                      <ThemeOption
                        htmlFor="light-theme"
                        themeName={themeName}
                        active={themeName === 'light'}
                      >
                        <Text order="body">Light</Text>
                        <ScreenReaderText>
                          <input
                            ref={setLastTabbableElementRef}
                            type="radio"
                            id="light-theme"
                            name="theme"
                            value="light"
                            checked={themeName === 'light'}
                            onChange={handleThemeChange}
                          />
                        </ScreenReaderText>
                      </ThemeOption>
                      <ThemeOption
                        htmlFor="dark-theme"
                        themeName={themeName}
                        active={themeName === 'dark'}
                      >
                        <Text order="body">Dark</Text>
                        <ScreenReaderText>
                          <input
                            ref={setLastTabbableElementRef}
                            type="radio"
                            id="dark-theme"
                            name="theme"
                            value="dark"
                            checked={themeName === 'dark'}
                            onChange={handleThemeChange}
                          />
                        </ScreenReaderText>
                      </ThemeOption>
                    </ThemeOptions>
                  </Spaced>
                </section>
              </Spaced>
            </ContentWrap>
          </Padded>
        </Menu>
      )}
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
    </MobileMenuWrap>
  ) : null
}

export default MobileMenu
