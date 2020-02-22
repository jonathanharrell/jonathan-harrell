import React, { useCallback, useContext, useRef, useState } from 'react'
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
import Ul from '../jh-ui/Ul'
import Ol from '../jh-ui/Ol'
import Footer from './Footer'
import SubscribeBanner from './SubscribeBanner'
import GlobalStyle from './globalStyle'
import ArticleHeading from './ArticleHeading'
import Header from './Header'

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
  z-index: 3;
  background-color: var(--backgroundInverse);

  &:focus {
    top: 1rem;
  }
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  //margin-top: 3.5rem;
  box-shadow: none;
  transition: opacity 0.2s ease-out;
  ${({ mobileMenuExpanded }) => mobileMenuExpanded ? `
    opacity: 0.5;
    pointer-events: none;
  ` : ''}

  // @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
  //   margin-top: 4.375rem;
  // }
`

const AnchoredHeading = styled(ArticleHeading)`
  &::before {
    display: block;
    margin-top: -2rem;
    padding-top: 2rem;
    content: "";
  }
`

const Link = styled(Text)`
  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
  }
`

const Layout = ({ children }) => {
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false)
  const { title, description } = useSiteMetadata()
  const { theme } = useContext(ThemeContext)
  const mainRef = useRef()

  const handleMobileMenuExpandedChange = useCallback(expanded => {
    setMobileMenuExpanded(expanded)
  }, [])

  const skipToContent = () => {
    mainRef.current.focus()
  }

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
      <Wrap className="layout">
        <SkipLink element="a" href="#main" onClick={skipToContent}>
          Skip to content
        </SkipLink>
        <Header
          mobileMenuExpanded={mobileMenuExpanded}
          handleMobileMenuExpandedChange={handleMobileMenuExpandedChange}
        />
        <Main
          id="main"
          tabIndex="-1"
          aria-label="Main Content"
          aria-hidden={mobileMenuExpanded}
          mobileMenuExpanded={mobileMenuExpanded}
          ref={mainRef}
        >
          <MDXProvider
            components={{
              h1: props => <Heading level={1} {...props}/>,
              h2: props => (
                <Spaced top="5x" bottom="m">
                  <AnchoredHeading {...props}/>
                </Spaced>
              ),
              h3: props => (
                <Spaced top="3x" bottom="m">
                  <Heading level={3} {...props}/>
                </Spaced>
              ),
              h4: props => (
                <Spaced top="2x" bottom="m">
                  <Heading level={4} {...props}/>
                </Spaced>
              ),
              h5: props => (
                <Spaced top="xxl" bottom="m">
                  <Heading level={5} {...props}/>
                </Spaced>
              ),
              h6: props => (
                <Spaced vertical="xl">
                  <Heading level={6} {...props}/>
                </Spaced>
              ),
              p: props => {
                if (props.children.props && props.children.props.originalType === 'img') {
                  return (
                    <Spaced bottom="m">
                      <figure {...props}/>
                    </Spaced>
                  )
                }

                return (
                  <Spaced bottom="m">
                    <Text {...props}/>
                  </Spaced>
                )
              },
              ul: props => (
                <Spaced bottom="m" left="m">
                  <Ul {...props} />
                </Spaced>
              ),
              ol: props => (
                <Spaced bottom="m" left="m">
                  <Ol {...props} />
                </Spaced>
              ),
              li: props => (
                <Spaced bottom="xs">
                  <li {...props}/>
                </Spaced>
              ),
              pre: Pre,
              code: Code,
              inlineCode: InlineCode,
              a: props => <Link element="a" {...props}/>,
              // img: Image
            }}
          >
            {children}
          </MDXProvider>
        </Main>
        <Footer inert={mobileMenuExpanded}/>
        <SubscribeBanner inert={mobileMenuExpanded}/>
      </Wrap>
    </ThemeProvider>
  )
}

export default Layout
