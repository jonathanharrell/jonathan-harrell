import React, { useContext, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import Spaced from '../../jh-ui/Spaced'
import { breakpoints } from '../../jh-ui/theme'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import ThemeContext from '../../context/theme'
import {
  DesktopMenuWrap,
  MenuLink,
  MenuLinkText,
  MenuLinkWrap,
  SiteTools,
  SubscribeButton,
  ThemeToggleButton
} from './styles'
import Sun from '../../svgs/icons/sun.svg'
import Moon from '../../svgs/icons/moon.svg'

const DesktopMenu = () => {
  const { themeName, setTheme } = useContext(ThemeContext)
  const [visible, setVisibility] = useState(true)

  useEffect(() => {
    // set up logic ot hide/show desktop menu based on the window width
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

  // some links need special logic to determine whether or not they should get the active style
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

  // in order to make sure the subscribe section is shown when the subscribe button is clicked,
  // we need to dispatch a custom event
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
            <h3 id="site-tools-label">
              Site Tools
            </h3>
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

export default DesktopMenu
