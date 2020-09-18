import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import debounce from 'lodash/debounce'
import { Moon, Sun } from 'react-feather'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import Spaced from '../../jh-ui/Spaced'
import { breakpoints } from '../../jh-ui/theme'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import SearchModal from '../SearchModal'
import ThemeContext from '../../context/theme'
import {
  DesktopMenuWrap,
  MenuLink,
  MenuLinkText,
  MenuLinkWrap,
  SiteNavigation,
  SiteTools,
  SubscribeButton,
  ThemeToggleButton
} from './styles'

const DesktopMenu = ({ location, shell }) => {
  const { themeName, setTheme } = useContext(ThemeContext)
  const [visible, setVisibility] = useState(true)

  useEffect(() => {
    // set up logic ot hide/show desktop menu based on the window width
    const rems = breakpoints.desktop.replace('rem', '')
    const fontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    )
    const desktopWidth = rems * fontSize

    const handleResize = debounce(() => {
      setVisibility(window.innerWidth >= desktopWidth)
    }, 10)

    setVisibility(window.innerWidth >= desktopWidth)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // some links need special logic to determine whether or not they should get the active style
  const isActive = ({ isCurrent, isPartiallyCurrent, href, location }) => {
    const props = {}

    if (href === '/') {
      if (isCurrent) {
        props['data-active'] = true
        props['aria-current'] = 'page'
      }

      return props
    }

    if (href === '/blog') {
      if (location.pathname.startsWith('/tags')) {
        props['data-active'] = true
      }
    }

    if (isCurrent || isPartiallyCurrent) {
      props['data-active'] = true
      props['aria-current'] = 'page'
    }

    return props
  }

  const toggleTheme = () => {
    setTheme(themeName === 'light' ? 'dark' : 'light')
  }

  // in order to make sure the subscribe section is shown when the subscribe button is clicked,
  // we need to dispatch a custom event
  const handleSubscribeClick = event => {
    event.preventDefault()
    localStorage.removeItem('subscribe-banner-dismissed')
    window.dispatchEvent(new CustomEvent('showSubscribe'))
    navigate(event.target.href)

    const emailInput = document.querySelector('#subscribe #email')

    if (emailInput) {
      emailInput.focus()
    }
  }

  return visible ? (
    <DesktopMenuWrap>
      <ScreenReaderText>
        <h2>Main Menu</h2>
      </ScreenReaderText>
      <Spaced left="3x">
        {!shell && (
          <SiteNavigation
            id="site-navigation"
            tabIndex={-1}
            aria-labelledby="site-links-label"
          >
            <ScreenReaderText>
              <h3 id="site-links-label">Site Links</h3>
            </ScreenReaderText>
            <nav role="navigation">
              <ul>
                <Spaced right="xxl">
                  <MenuLinkWrap>
                    <MenuLink to="/" rel="home" getProps={isActive}>
                      <MenuLinkText order="body" element="span">
                        Home
                      </MenuLinkText>
                    </MenuLink>
                  </MenuLinkWrap>
                  <MenuLinkWrap>
                    <MenuLink to="/blog" getProps={isActive}>
                      <MenuLinkText order="body" element="span">
                        Articles
                      </MenuLinkText>
                    </MenuLink>
                  </MenuLinkWrap>
                  <MenuLinkWrap>
                    <MenuLink to="/about" getProps={isActive}>
                      <MenuLinkText order="body" element="span">
                        About
                      </MenuLinkText>
                    </MenuLink>
                  </MenuLinkWrap>
                  <MenuLinkWrap>
                    <MenuLink to="/work" getProps={isActive}>
                      <MenuLinkText order="body" element="span">
                        Work
                      </MenuLinkText>
                    </MenuLink>
                  </MenuLinkWrap>
                </Spaced>
              </ul>
            </nav>
          </SiteNavigation>
        )}
        <SiteTools aria-labelledby="site-tools-label">
          <ScreenReaderText>
            <h3 id="site-tools-label">Site Tools</h3>
          </ScreenReaderText>
          <Spaced left="xl">
            <SearchModal location={location} />
          </Spaced>
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
                key={themeName}
                content={`Change theme to ${
                  themeName === 'light' ? 'dark' : 'light'
                }`}
                placement="bottom"
                animation="shift-away"
                theme="jh"
              >
                <span>{themeName === 'light' ? <Sun /> : <Moon />}</span>
              </Tippy>
            </ThemeToggleButton>
            <SubscribeButton
              order="secondary"
              element="a"
              href="#subscribe"
              onClick={handleSubscribeClick}
            >
              Subscribe
            </SubscribeButton>
          </Spaced>
        </SiteTools>
      </Spaced>
    </DesktopMenuWrap>
  ) : null
}

DesktopMenu.propTypes = {
  location: PropTypes.object.isRequired,
  shell: PropTypes.bool.isRequired
}

export default DesktopMenu
