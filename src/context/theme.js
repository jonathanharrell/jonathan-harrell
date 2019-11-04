import React from 'react'
import theme from '../jh-ui/theme'

const ThemeContext = React.createContext({
  theme: theme,
  themeName: null,
  setTheme: () => {
  }
})

export default ThemeContext
