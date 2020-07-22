import React, { useEffect, useState } from 'react'
import addons from '@storybook/addons'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import GlobalStyle from '../components/GlobalStyle/'

// get channel to listen to event emitter
const channel = addons.getChannel()

const ThemeWrap = props => {
  const [themeName, setThemeName] = useState('light')

  useEffect(() => {
    const toggleDarkMode = isDarkMode => {
      setThemeName(isDarkMode ? 'dark' : 'light')
    }

    // listen to DARK_MODE event
    channel.addListener('DARK_MODE', toggleDarkMode)
    return () => channel.removeListener('DARK_MODE', toggleDarkMode)
  }, [setThemeName])

  useEffect(() => {
    document.body.setAttribute('data-theme', themeName)
  })

  // render your custom theme provider
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {props.children}
    </ThemeProvider>
  )
}

export default ThemeWrap
