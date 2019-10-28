import React, { useContext } from 'react'
import { MDXProvider } from '@mdx-js/react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Helmet } from 'react-helmet'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import ThemeContext from '../context/theme'
import Heading from '../jh-ui/Heading'
import Text from '../jh-ui/Text'
import Spaced from '../jh-ui/Spaced'
import Footer from './Footer'
import SubscribeBanner from './SubscribeBanner'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    min-width: 20rem;
    background-color: ${({ theme }) => theme.colors.backgroundBody};
    font-family: 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  
  h1,
  h2,
  h3,
  h4 {
    font-family: "DM Serif Text", serif;
    font-weight: 400 !important;
  }
  
  p code {
    padding: 0.125rem 0.25rem;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  }
  
  pre {
    margin: ${({ theme }) => theme.spacing.xl} -${({ theme }) => theme.spacing.l};
    padding: ${({ theme }) => theme.spacing.m} ${({ theme }) => theme.spacing.l};
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  }
  
  pre code {
    line-height: 1.4;
    white-space: pre-wrap;
  }
`

const Wrap = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata()
  const { theme } = useContext(ThemeContext)

  return (
    <ThemeProvider theme={theme}>
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
      <GlobalStyle/>
      <Wrap>
        {/*<Navbar/>*/}
        <div>
          <MDXProvider
            components={{
              h1: props => <Heading level={1} {...props}/>,
              h2: props => <Heading level={2} {...props}/>,
              h3: props => <Heading level={3} {...props}/>,
              h4: props => <Heading level={4} {...props}/>,
              h5: props => <Heading level={5} {...props}/>,
              h6: props => <Heading level={6} {...props}/>,
              p: props => (
                <Spaced bottom="m">
                  <Text {...props}/>
                </Spaced>
              )
            }}
          >
            {children}
          </MDXProvider>
        </div>
        <Footer/>
        <SubscribeBanner/>
      </Wrap>
    </ThemeProvider>
  )
}

export default Layout
