import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../jh-ui/theme'
import Button from '../jh-ui/Button'
import Heading from '../jh-ui/Heading'
import Spaced from '../jh-ui/Spaced'
import GlobalStyle from './globalStyle'

const ErrorWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: ${({ theme }) => theme.spacing['3x']};
  background-color: var(--backgroundPrimary);
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['5x']};
  }
`

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { eventId: null }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo)
      const eventId = Sentry.captureException(error)
      this.setState({ eventId })
    })
  }

  handleClick = () => {
    Sentry.showReportDialog({ eventId: this.state.eventId })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ThemeProvider theme={theme}>
          <GlobalStyle withBackground/>
          <ErrorWrap>
            <Heading level={1}>
              Oops! There was an error.
            </Heading>
            <Spaced top="m">
              <Button onClick={this.handleClick}>
                Report feedback
              </Button>
            </Spaced>
          </ErrorWrap>
        </ThemeProvider>
      )
    }

    return this.props.children
  }
}
