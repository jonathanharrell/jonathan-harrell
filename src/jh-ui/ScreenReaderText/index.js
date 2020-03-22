import React from 'react'
import PropTypes from 'prop-types'
import Heading from '../Heading'
import { ScreenReaderOnlySpan } from './styles'

const ScreenReaderText = ({ element, children }) => (
  <ScreenReaderOnlySpan as={element}>
    {children}
  </ScreenReaderOnlySpan>
)

Heading.propTypes = {
  element: PropTypes.string
}

export default ScreenReaderText
