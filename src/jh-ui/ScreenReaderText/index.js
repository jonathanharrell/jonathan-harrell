import React from 'react'
import styled from 'styled-components'
import { string } from 'prop-types'
import Heading from '../Heading'

const ScreenReaderOnlySpan = styled.span`
  clip: rect(0 0 0 0);
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  margin: -1px;
  padding: 0;
  border: 0;
  white-space: nowrap;
`

const ScreenReaderText = ({ children, element }) => (
  <ScreenReaderOnlySpan as={element}>
    {children}
  </ScreenReaderOnlySpan>
)

Heading.propTypes = {
  element: string
}

export default ScreenReaderText
