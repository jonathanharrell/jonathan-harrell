import React from 'react'
import PropTypes from 'prop-types'
import Heading from '../Heading'
import { ScreenReaderOnlySpan } from './styles'

const ScreenReaderText = ({ element, children, ...props }) => (
  <ScreenReaderOnlySpan as={element} {...props}>
    {children}
  </ScreenReaderOnlySpan>
)

Heading.propTypes = {
  element: PropTypes.string
}

export default ScreenReaderText
