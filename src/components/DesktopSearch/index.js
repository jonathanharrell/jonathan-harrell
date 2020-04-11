import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import debounce from 'lodash/debounce'
import Tippy from '@tippy.js/react'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import { breakpoints } from '../../jh-ui/theme'
import Overlay from '../Overlay'
import Search from '../Search'
import { DesktopSearchWrap, SearchButton, SearchWrap } from './styles'
import SearchIcon from '../../svgs/icons/search.svg'

const DesktopSearch = () => {
  const [visible, setVisibility] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const searchButtonRef = useRef()
  const searchWrapRef = useRef()

  useEffect(() => {
    // implement close on document click
    const handleClick = event => {
      if (
        searchWrapRef.current &&
        !searchWrapRef.current.contains(event.target) &&
        searchButtonRef.current !== event.target &&
        !searchButtonRef.current.contains(event.target)
      ) {
        close()
      }
    }

    window.addEventListener('click', handleClick)

    // set up logic ot hide/show search based on the window width
    const rems = breakpoints.desktop.replace('rem', '')
    const fontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    )
    const desktopWidth = rems * fontSize

    const handleResize = debounce(() => {
      setVisibility(window.innerWidth >= desktopWidth)
      if (window.innerWidth < desktopWidth) close()
    }, 50)

    setVisibility(window.innerWidth >= desktopWidth)

    window.addEventListener('resize', handleResize)
    window.addEventListener('routeUpdate', close)

    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('routeUpdate', close)
    }
  }, [])

  const handleKeydown = () => {
  }

  const open = () => {
    setExpanded(true)
  }

  const close = () => {
    setExpanded(false)
  }

  return visible ? (
    <DesktopSearchWrap onKeyDown={handleKeydown}>
      <SearchButton
        ref={searchButtonRef}
        expanded={expanded}
        aria-expanded={expanded}
        aria-controls="search"
        unstyled
        onClick={open}
      >
        <ScreenReaderText>Open search</ScreenReaderText>
        <Tippy
          content={expanded ? 'Close search' : 'Open search'}
          placement="bottom"
          animation="shift-away"
          theme="jh"
        >
          <span>
            <SearchIcon />
          </span>
        </Tippy>
      </SearchButton>
      <AnimatePresence>
        {expanded && (
          <Overlay>
            <motion.div
              id="search"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ stiffness: 50, mass: 0.1 }}
              style={{
                position: 'fixed',
                top: '0',
                right: '0',
                zIndex: 1
              }}
            >
              <SearchWrap ref={searchWrapRef}>
                <Search />
              </SearchWrap>
            </motion.div>
          </Overlay>
        )}
      </AnimatePresence>
    </DesktopSearchWrap>
  ) : null
}

export default DesktopSearch
