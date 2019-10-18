import React from 'react'
import Spaced from '../Spaced'

const SectionHeader = ({ children, ...props }) => (
  <Spaced bottom="l">
    <header {...props}>
      {children}
    </header>
  </Spaced>
)

SectionHeader.propTypes = {}

SectionHeader.defaultProps = {}

export default SectionHeader
