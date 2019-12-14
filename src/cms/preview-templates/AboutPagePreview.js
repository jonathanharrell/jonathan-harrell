import React from 'react'
import PropTypes from 'prop-types'
import theme from '../../jh-ui/theme'
import { ThemeProvider } from 'styled-components'
import ThemeContext from '../../context/theme'

const AboutPagePreview = ({ entry, widgetFor }) => (
  <ThemeContext.Provider value={{ theme }}>
    <div style={{
      fontFamily: `'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'`,
      lineHeight: 1.4
    }}>
      <ThemeProvider theme={theme}>
        <h1>{entry.getIn(['data', 'title'])}</h1>
        {widgetFor('body')}
      </ThemeProvider>
    </div>
  </ThemeContext.Provider>
)

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default AboutPagePreview
