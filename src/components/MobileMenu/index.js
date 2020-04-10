import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import { AnimatePresence, motion } from 'framer-motion'
import Text from '../../jh-ui/Text'
import Heading from '../../jh-ui/Heading'
import Padded from '../../jh-ui/Padded'
import Spaced from '../../jh-ui/Spaced'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import { breakpoints } from '../../jh-ui/theme'
import ThemeContext from '../../context/theme'
import {
  CloseButton,
  Menu,
  MenuButton,
  MenuHeader,
  MenuLink,
  MenuLinkWrap,
  MobileMenuWrap,
  ThemeOption,
  ThemeOptions
} from './styles'
import X from '../../svgs/icons/x.svg'

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
    // implement close on document click
    const handleClick = event => {
      if (menuWrapRef.current && !menuWrapRef.current.contains(event.target)) {
        close()
      }
    }

    window.addEventListener('click', handleClick)

    // set up logic ot hide/show mobile menu based on the window width
    const rems = breakpoints.desktop.replace('rem', '')
    const fontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    )
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
        // when menu is closed, reset body
        document.body.style.position = ''
        document.body.style.top = ''
        // emit to parent
        handleExpandedChange(false)
        // focus toggle button
        toggleButtonRef.current.focus()
      }
    } else {
      // emit to parent
      handleExpandedChange(false)
    }
  }, [visible, expanded, handleExpandedChange])

  const setLastTabbableElementRef = element => {
    lastTabbableElementRef.push(element)
  }

  // some links need special logic to determine whether or not they should get the active style
  const isActive = ({ isCurrent, href, location }) => {
    const props = {}

    if (href === '/blog') {
      if (location.pathname.startsWith('/blog')) {
        props['data-active'] = true
      }

      if (location.pathname.startsWith('/tags')) {
        props['data-active'] = true
      }

      if (location.pathname === '/blog' || location.pathname === '/blog/') {
        props['aria-current'] = 'page'
      }
    }

    if (href === '/about' && location.pathname.startsWith('/about')) {
      props['data-active'] = true
      props['aria-current'] = 'page'
    }

    if (isCurrent) {
      props['data-active'] = true
      props['aria-current'] = 'page'
    }

    return props
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
    setExpanded(false)
  }

  const handleThemeChange = event => {
    setTheme(event.target.value)
  }

  return visible ? (
    <MobileMenuWrap ref={menuWrapRef} onKeyDown={handleKeydown}>
      <MenuButton
        ref={toggleButtonRef}
        expanded={expanded}
        aria-expanded={expanded}
        order="secondary"
        id="site-navigation"
        aria-controls="main-menu"
        title={expanded ? 'Close menu' : 'Open menu'}
        onClick={open}
      >
        Menu
      </MenuButton>
      <AnimatePresence>
        {expanded && (
          <motion.div
            id="main-menu"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', stiffness: 50, mass: 0.2 }}
            style={{
              position: 'fixed',
              top: 'calc(1rem - 5px)',
              right: '1rem'
            }}
          >
            <Menu>
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
                        <X />
                      </CloseButton>
                    </MenuHeader>
                    <Spaced vertical="3x">
                      <section aria-labelledby="site-links-label">
                        <h3>
                          <ScreenReaderText id="site-links-label">
                            Site Links
                          </ScreenReaderText>
                          <Text order="meta" aria-hidden>
                            Links
                          </Text>
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
                                <MenuLink to="/blog" getProps={isActive}>
                                  <Heading level={1} element="span">
                                    Articles
                                  </Heading>
                                </MenuLink>
                              </MenuLinkWrap>
                              <MenuLinkWrap>
                                <MenuLink to="/about" getProps={isActive}>
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
                          <ScreenReaderText>Theme Settings</ScreenReaderText>
                          <Text order="meta" aria-hidden>
                            Change Theme
                          </Text>
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
          </motion.div>
        )}
      </AnimatePresence>
      <noscript>
        <nav role="navigation">
          <Spaced right="xl">
            <MenuLink to="/" rel="home">
              Home
            </MenuLink>
            <MenuLink to="/blog">Articles</MenuLink>
            <MenuLink to="/about">About</MenuLink>
          </Spaced>
        </nav>
      </noscript>
    </MobileMenuWrap>
  ) : null
}

MobileMenu.propTypes = {
  handleExpandedChange: PropTypes.func.isRequired
}

export default MobileMenu
