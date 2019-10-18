import React from 'react'
import styled from 'styled-components'
import { bool } from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import { breakpoints, colors } from '../themes'
import ArrowRight from '../../img/icons/arrow-right.svg'
import Spaced from '../Spaced'

const Root = styled(GatsbyLink)`
  display: inline-flex;
  align-items: center;
  height: ${({ theme }) => theme.fontSizes.m.mobile};
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme }) => theme.fontSizes.m.mobile};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accent};
  
  @media (min-width: ${breakpoints.tablet}) {
    height: ${({ theme }) => theme.fontSizes.m.tablet};
    font-size: ${({ theme }) => theme.fontSizes.m.tablet};
  }
  
  @media (min-width: ${breakpoints.desktop}) {
    height: ${({ theme }) => theme.fontSizes.m.desktop};
    font-size: ${({ theme }) => theme.fontSizes.m.desktop};
  }
  
  &:hover,
  &:focus,
  &:focus-within,
  &:active {
    color: ${colors.redDark};
  }
`

const Link = ({ children, arrow, anchor, ...props }) => (
  <Root as={anchor ? 'a' : undefined} {...props}>
    {children}
    {arrow && (
      <Spaced left="xs">
        <ArrowRight/>
      </Spaced>
    )}
  </Root>
)

Link.propTypes = {
  arrow: bool,
  anchor: bool
}

Link.defaultProps = {
  arrow: false,
  anchor: false
}

export default Link
