import React, { useEffect, useState } from 'react'
import addons from '@storybook/addons'
import { ThemeProvider } from 'styled-components'
import themes from './themes'

// get channel to listen to event emitter
const channel = addons.getChannel()

// create a component that listens for the DARK_MODE event
const ThemeWrap = props => {
  // this example uses hook but you can also use class component as well
  const [theme, setTheme] = useState(themes.light)

  useEffect(() => {
    const toggleDarkMode = isDarkMode => {
      setTheme(isDarkMode ? themes.dark : themes.light)
    }

    // listen to DARK_MODE event
    channel.addListener('DARK_MODE', toggleDarkMode)
    return () => channel.removeListener('DARK_MODE', toggleDarkMode)
  }, [channel, setTheme])

  // render your custom theme provider
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}

export default ThemeWrap
