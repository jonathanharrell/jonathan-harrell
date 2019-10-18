import React from 'react'
import styled from 'styled-components'

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

const ScreenReaderText = ({ children }) => (
  <ScreenReaderOnlySpan>
    {children}
  </ScreenReaderOnlySpan>
)

export default ScreenReaderText
