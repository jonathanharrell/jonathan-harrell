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
  background-color: var(--backgroundPrimary);
`

const MenuLink = styled(Link)`
  display: block;
  text-decoration: none;
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
        lastTabbableElementRef.current.focus()
      }
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
      <ToggleButton ref={toggleButtonRef} onClick={toggleVisibility}>
        menu
      </ToggleButton>
      {visible && (
        <Menu
          role="dialog"
          aria-modal={true}
          aria-label="Main Menu"
        >
          <Padded top="4x" bottom="2x">
            <ContentWrap>
              <Spaced vertical="3x">
                <section aria-label="Site Links">
                  <h2>
                    <Text order="meta">Links</Text>
                  </h2>
                  <nav>
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
                  <form>
                    <input
                      ref={setLastTabbableElementRef}
                      type="radio"
                      id="light-theme"
                      name="theme"
                      value="light"
                      checked={themeName === 'light'}
                      onChange={handleThemeChange}
                    />
                    <label htmlFor="light-theme">
                      <Text order="body">Light</Text>
                    </label>
                    <input
                      ref={setLastTabbableElementRef}
                      type="radio"
                      id="dark-theme"
                      name="theme"
                      value="dark"
                      checked={themeName === 'dark'}
                      onChange={handleThemeChange}
                    />
                    <label htmlFor="dark-theme">
                      <Text order="body">Dark</Text>
                    </label>
                  </form>
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
