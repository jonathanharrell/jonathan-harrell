import React from 'react'
import theme from '../jh-ui/theme'

const ThemeContext = React.createContext({
  theme: theme,
  themeName: window.__theme,
  setTheme: () => {
  }
})

export default ThemeContext
