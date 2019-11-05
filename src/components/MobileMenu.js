import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Button from '../jh-ui/Button'
import Text from '../jh-ui/Text'
import ContentWrap from './ContentWrap'
import Heading from '../jh-ui/Heading'
import Padded from '../jh-ui/Padded'
import Spaced from '../jh-ui/Spaced'
import ThemeContext from '../context/theme'
import ScreenReaderText from '../jh-ui/ScreenReaderText'

const ToggleButton = styled(Button)`
  position: relative;
  z-index: 1;
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
  const [visible, setVisibility] = useState(false)
  const toggleButtonRef = useRef()
  const firstTabbableElementRef = useRef()
  const lastTabbableElementRef = []

  useEffect(() => {
    if (visible) {
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
  }, [visible])

  const setLastTabbableElementRef = element => {
    lastTabbableElementRef.push(element)
  }

  const isActive = ({ isCurrent }) => {
    return isCurrent ? { style: { opacity: 0.5 } } : null
  }

  const handleKeydown = event => {
    if (!visible) return

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
      setVisibility(false)
    }
  }

  const toggleVisibility = () => {
    setVisibility(!visible)
  }

  const handleThemeChange = event => {
    setTheme(event.target.value)
  }

  return (
    <div onKeyDown={handleKeydown}>
      <ToggleButton
        ref={toggleButtonRef}
        aria-expanded={visible}
        aria-controls="main-menu"
        onClick={toggleVisibility}
      >
        Main Menu
      </ToggleButton>
      {visible && (
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
                  <Spaced top="m">
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
    </div>
  )
}

export default MobileMenu
