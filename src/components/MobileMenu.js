import React, { useContext, useEffect, useRef, useState } from 'react'
import BodyClassName from 'react-body-classname'
import { Link } from 'gatsby'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import Button from '../jh-ui/Button'
import Text from '../jh-ui/Text'
import Heading from '../jh-ui/Heading'
import Padded from '../jh-ui/Padded'
import Spaced from '../jh-ui/Spaced'
import ThemeContext from '../context/theme'
import ScreenReaderText from '../jh-ui/ScreenReaderText'
import { breakpoints } from '../jh-ui/theme'
import X from '../img/icons/x.svg'

const MobileMenuWrap = styled.div`
  .no-js & {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`

const MenuButton = styled(Button)`
  .header-background-blue &,
  .header-background-orange & {
    color: white;
  }

  &:hover,
  &:focus {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`

const Menu = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 100%;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  overscroll-behavior-y: contain;
  background-color: var(--backgroundPrimary);
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.elevations.high};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: auto;
  }
`

const MenuHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: calc(100% - ${({ theme }) => theme.spacing['4x']});
`

const CloseButton = styled(Button)`
  height: auto;
  margin-left: auto;
  padding: 0.3rem;
  border: 0;
  background-color: var(--backgroundTertiary);
  color: var(--text);
`

const MenuLinkWrap = styled.li`
  list-style: none;
`

const MenuLink = styled(Link)`
  display: block;
  text-decoration: none;

  &[data-active] > span {
    color: var(--textLighter);
  }

  &:hover,
  &:focus {
    > span {
      color: var(--textLighter);
    }
  }

  &:active {
    > span {
      color: var(--textLight);
    }
  }
`

const ThemeOptions = styled.form`
  display: inline-flex;
  align-items: center;

  &:focus-within {
    box-shadow: 0 0 0 0.2em var(--selection);
  }
`

const getThemeOptionBackgroundColor = ({ active, themeName, action }) => {
  if (themeName === 'light') {
    if (active) {
      return 'hsl(0, 0%, 80%)'
    }

    if (action === 'hover' || action === 'focus') {
      return 'hsl(0, 0%, 86%)'
    }

    if (action === 'active') {
      return 'hsl(0, 0%, 88%)'
    }

    return 'hsl(0, 0%, 90%)'
  } else {
    if (active) {
      return 'hsl(0, 0%, 25%)'
    }

    if (action === 'hover' || action === 'focus') {
      return 'hsl(0, 0%, 19%)'
    }

    if (action === 'active') {
      return 'hsl(0, 0%, 17%)'
    }

    return 'hsl(0, 0%, 15%)'
  }
}

const ThemeOption = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing['3x']};
  background-color: ${({ active, themeName }) => getThemeOptionBackgroundColor({ active, themeName })};
  border-radius: 4px;
  text-align: center;
  cursor: ${({ active }) => active ? 'not-allowed' : 'pointer'};

  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:hover {
    background-color: ${({ active, themeName }) => getThemeOptionBackgroundColor({
  active,
  themeName,
  action: 'hover'
})};
  }

  &:focus {
    background-color: ${({ active, themeName }) => getThemeOptionBackgroundColor({
  active,
  themeName,
  action: 'focus'
})};
  }

  &:active {
    background-color: ${({ active, themeName }) => getThemeOptionBackgroundColor({
  active,
  themeName,
  action: 'active'
})};
  }
`

const MobileMenu = ({ handleExpandedChange }) => {
  const { themeName, setTheme } = useContext(ThemeContext)
  const [visible, setVisibility] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const toggleButtonRef = useRef()
  const menuWrapRef = useRef()
  const closeButtonRef = useRef()
  const menuHeadingRef = useRef()
  const firstTabbableElementRef = useRef()
  const lastTabbableElementRef = []

  useEffect(() => {
    const handleClick = event => {
      if (menuWrapRef.current && !menuWrapRef.current.contains(event.target)) {
        close()
      }
    }

    window.addEventListener('click', handleClick)

    const rems = breakpoints.desktop.replace('rem', '')
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const desktopWidth = rems * fontSize

    const handleResize = debounce(() => {
      setVisibility(window.innerWidth < desktopWidth)
    }, 50)

    setVisibility(window.innerWidth < desktopWidth)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (visible) {
      if (expanded) {
        // when menu is opened, fix body to prevent scrolling outside menu
        document.body.style.top = `-${window.scrollY}px`
        document.body.style.position = 'fixed'
        // focus menu heading
        closeButtonRef.current.focus()
        // emit to parent
        handleExpandedChange(true)
      } else {
        // when menu is closed, reset body to original scroll position
        const scrollY = document.body.style.top
        document.body.style.position = ''
        document.body.style.top = ''
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
        // emit to parent
        handleExpandedChange(false)
      }
    } else {
      // emit to parent
      handleExpandedChange(false)
    }
  }, [visible, expanded])

  const setLastTabbableElementRef = element => {
    lastTabbableElementRef.push(element)
  }

  const isActive = ({ isCurrent }) => {
    return isCurrent ? { 'data-active': true } : null
  }

  const handleKeydown = event => {
    if (!expanded) return

    // if tabbing from last link, force toggle button to get focus
    if (event.key === 'Tab' && !event.shiftKey) {
      if (lastTabbableElementRef.includes(event.target)) {
        event.preventDefault()
        closeButtonRef.current.focus()
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
      close()
    }
  }

  const open = () => {
    setExpanded(true)
  }

  const close = () => {
    toggleButtonRef.current.focus()
    setExpanded(false)
  }

  const handleThemeChange = event => {
    setTheme(event.target.value)
  }

  return visible ? (
    <MobileMenuWrap ref={menuWrapRef} onKeyDown={handleKeydown}>
      <BodyClassName className={expanded ? 'mobile-menu-expanded' : ''}/>
      <MenuButton
        ref={toggleButtonRef}
        expanded={expanded}
        aria-expanded={expanded}
        order="secondary"
        aria-controls="main-menu"
        title={expanded ? 'Close menu' : 'Open menu'}
        onClick={open}
      >
        Menu
      </MenuButton>
      {expanded && (
        <Menu id="main-menu">
          <Padded top="4x" bottom="2x">
            <Padded horizontal="2x" top="2x" bottom="4x">
              <div>
                <MenuHeader>
                  <ScreenReaderText>
                    <h2 ref={menuHeadingRef} tabIndex="-1">
                      Main Menu
                    </h2>
                  </ScreenReaderText>
                  <CloseButton ref={closeButtonRef} onClick={close}>
                    <ScreenReaderText>Close Menu</ScreenReaderText>
                    <X/>
                  </CloseButton>
                </MenuHeader>
                <Spaced vertical="3x">
                  <section aria-labelledby="site-links-label">
                    <h3>
                      <ScreenReaderText id="site-links-label">Site Links</ScreenReaderText>
                      <Text order="meta" aria-hidden>Links</Text>
                    </h3>
                    <nav role="navigation">
                      <ul>
                        <Spaced vertical="l">
                          <MenuLinkWrap>
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
                          </MenuLinkWrap>
                          <MenuLinkWrap>
                            <MenuLink
                              to="/blog"
                              getProps={isActive}
                            >
                              <Heading level={1} element="span">
                                Articles
                              </Heading>
                            </MenuLink>
                          </MenuLinkWrap>
                          <MenuLinkWrap>
                            <MenuLink
                              to="/about"
                              getProps={isActive}
                            >
                              <Heading level={1} element="span">
                                About
                              </Heading>
                            </MenuLink>
                          </MenuLinkWrap>
                        </Spaced>
                      </ul>
                    </nav>
                  </section>
                  <section aria-labelledby="theme-settings-label">
                    <h3 id="theme-settings-label">
                      <ScreenReaderText>
                        Theme Settings
                      </ScreenReaderText>
                      <Text order="meta" aria-hidden>Change Theme</Text>
                    </h3>
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
              </div>
            </Padded>
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
