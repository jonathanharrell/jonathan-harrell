import React, { useEffect, useState } from 'react'
import ThemeContext from '../context/theme'
import theme from '../jh-ui/theme'

const Root = ({ children }) => {
  const [themeName, setTheme] = useState('light')

  useEffect(() => {
    let defaultThemeName = 'light'

    const savedThemeName = sessionStorage.getItem('jh-theme')
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    if (savedThemeName) {
      defaultThemeName = savedThemeName
    } else if (darkModeMediaQuery.matches) {
      defaultThemeName = 'dark'
    }

    setTheme(defaultThemeName)

    darkModeMediaQuery.addListener(() => {
      const newThemeName = darkModeMediaQuery.matches ? 'dark' : 'light'
      setTheme(newThemeName)
    })
  }, [])

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark')
    document.body.classList.add(`theme-${themeName}`)
  })

  const toggleTheme = () => {
    const newThemeName = themeName === 'light' ? 'dark' : 'light'
    setTheme(newThemeName)
    sessionStorage.setItem('jh-theme', newThemeName)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default Root
