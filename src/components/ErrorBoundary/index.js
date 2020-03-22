import React from 'react'
import { ThemeProvider } from 'styled-components'
import * as Sentry from '@sentry/browser'
import theme from '../../jh-ui/theme'
import Button from '../../jh-ui/Button'
import Heading from '../../jh-ui/Heading'
import Spaced from '../../jh-ui/Spaced'
import GlobalStyle from '../GlobalStyle/'
import { ErrorWrap } from './styles'

// this component will catch any unhandled error and display a message and report button
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
