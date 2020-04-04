import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from 'styled-components'
import Heading from '../../jh-ui/Heading'
import Text from '../../jh-ui/Text'
import Spaced from '../../jh-ui/Spaced'
import Pre from '../../jh-ui/Pre'
import Code from '../../jh-ui/Code'
import InlineCode from '../../jh-ui/InlineCode'
import Ul from '../../jh-ui/Ul'
import Ol from '../../jh-ui/Ol'
import Footer from '../Footer'
import GlobalStyle from '../GlobalStyle'
import Seo from '../seo'
import Header from '../Header'
import Figure from '../Figure'
import Note from '../Note/'
import Codepen from '../Codepen'
import ArticleLink from '../ArticleLink'
import SubscribeBanner from '../SubscribeBanner/'
import ThemeContext from '../../context/theme'
import { AnchoredHeading, Link, Main, SkipLink, Wrap } from './styles'

const Layout = ({ children }) => {
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false)
  const { theme } = useContext(ThemeContext)
  const mainRef = useRef()

  useEffect(() => {
    document.body.style.opacity = 1
  })

  const handleMobileMenuExpandedChange = useCallback(expanded => {
    setMobileMenuExpanded(expanded)
  }, [])

  const skipToContent = () => {
    mainRef.current.focus()
  }

  return (
    <ThemeProvider theme={theme}>
      <Seo/>
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
                if (props.children.props && props.children.props.originalType === 'figure') {
                  return (
                    <Spaced vertical="2x">
                      <Figure {...props}/>
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
              Note,
              Codepen,
              ArticleLink
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
