import React, { useContext } from 'react'
import { MDXProvider } from '@mdx-js/react'
import styled, { ThemeProvider } from 'styled-components'
import { Helmet } from 'react-helmet'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import ThemeContext from '../context/theme'
import Heading from '../jh-ui/Heading'
import Text from '../jh-ui/Text'
import Spaced from '../jh-ui/Spaced'
import Pre from '../jh-ui/Pre'
import Code from '../jh-ui/Code'
import InlineCode from '../jh-ui/InlineCode'
import Button from '../jh-ui/Button'
import Footer from './Footer'
import SubscribeBanner from './SubscribeBanner'
import GlobalStyle from './globalStyle'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background);
`

const SkipLink = styled(Button)`
  position: fixed;
  top: -100%;
  left: 1rem;
  z-index: 2;
  
  &:focus {
    top: 1rem;
  }
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
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
      <GlobalStyle withBackground/>
      <Wrap>
        <SkipLink element="a" href="#main">
          Skip to content
        </SkipLink>
        {/*<Navbar/>*/}
        <Main id="main" aria-label="Main Content">
          <MDXProvider
            components={{
              h1: props => <Heading level={1} {...props}/>,
              h2: props => (
                <Spaced top="3x" bottom="m">
                  <Heading level={2} {...props}/>
                </Spaced>
              ),
              h3: props => (
                <Spaced top="2x" bottom="m">
                  <Heading level={3} {...props}/>
                </Spaced>
              ),
              h4: props => (
                <Spaced top="xxl" bottom="m">
                  <Heading level={4} {...props}/>
                </Spaced>
              ),
              h5: props => (
                <Spaced top="xl" bottom="m">
                  <Heading level={5} {...props}/>
                </Spaced>
              ),
              h6: props => (
                <Spaced vertical="l">
                  <Heading level={6} {...props}/>
                </Spaced>
              ),
              p: props => (
                <Spaced bottom="m">
                  <Text {...props}/>
                </Spaced>
              ),
              pre: Pre,
              code: Code,
              inlineCode: InlineCode,
              a: props => <Text element="a" {...props}/>
            }}
          >
            {children}
          </MDXProvider>
        </Main>
        <Footer/>
        <SubscribeBanner/>
      </Wrap>
    </ThemeProvider>
  )
}

export default Layout
