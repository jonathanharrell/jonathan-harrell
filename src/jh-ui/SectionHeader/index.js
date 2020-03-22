import React from 'react'
import Spaced from '../Spaced'
import { SectionHeaderWrap } from './styles'

const SectionHeader = ({ children, ...props }) => (
  <Spaced bottom="2x">
    <SectionHeaderWrap {...props}>
      {children}
    </SectionHeaderWrap>
  </Spaced>
)

export default SectionHeader
