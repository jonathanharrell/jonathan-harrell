import React, { useState, useContext } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.sass'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import themes from '../jh-ui/themes'
import ThemeContext from '../context/theme'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata()
  const { theme } = useContext(ThemeContext)

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Helmet>
          <html lang="en"/>
          <title>{title}</title>
          <meta name="description" content={description}/>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${withPrefix('/')}img/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`${withPrefix('/')}img/favicon-32x32.png`}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${withPrefix('/')}img/favicon-16x16.png`}
            sizes="16x16"
          />
          <link
            rel="mask-icon"
            href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff"/>
          <meta property="og:type" content="business.business"/>
          <meta property="og:title" content={title}/>
          <meta property="og:url" content="/"/>
          <meta
            property="og:image"
            content={`${withPrefix('/')}img/og-image.jpg`}
          />
        </Helmet>
        {/*<Navbar/>*/}
        <div>{children}</div>
        <Footer/>
      </Wrapper>
    </ThemeProvider>
  )
}

const TemplateWrapper = ({ children }) => {
  const [theme, setTheme] = useState(themes.light)

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Layout>
        {children}
      </Layout>
    </ThemeContext.Provider>
  )
}

export default TemplateWrapper
