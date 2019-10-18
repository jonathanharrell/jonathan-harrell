import React from 'react'
import styled from 'styled-components'
import Spaced from '../Spaced'
import { breakpoints } from '../themes'

const SectionHeaderWrap = styled.header`
  @media (min-width: ${breakpoints.mobile}) {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
  }
  
  [class^=Heading] {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    
    @media (min-width: ${breakpoints.mobile}) {
      margin-bottom: 0;
    }
  }
`

const SectionHeader = ({ children, ...props }) => (
  <Spaced bottom="2x">
    <SectionHeaderWrap {...props}>
      {children}
    </SectionHeaderWrap>
  </Spaced>
)

SectionHeader.propTypes = {}

SectionHeader.defaultProps = {}

export default SectionHeader
