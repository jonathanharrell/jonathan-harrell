import React from 'react'
import styled from 'styled-components'
import { bool } from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import ArrowRight from '../../img/icons/arrow-right.svg'
import Spaced from '../Spaced'

const Root = styled(GatsbyLink)`
  display: inline-flex;
  align-items: center;
  height: ${({ theme }) => theme.fontSizes.m.mobile};
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme }) => theme.fontSizes.m.mobile};
  text-decoration: none;
  color: var(--accent);
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: ${({ theme }) => theme.fontSizes.m.tablet};
    font-size: ${({ theme }) => theme.fontSizes.m.tablet};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: ${({ theme }) => theme.fontSizes.m.desktop};
    font-size: ${({ theme }) => theme.fontSizes.m.desktop};
  }
  
  &:hover,
  &:focus,
  &:focus-within,
  &:active {
    color: ${({ theme }) => theme.colors.redDark};
  }
`

const Link = ({ children, arrow, href, ...props }) => (
  <Root as={href ? 'a' : undefined} href={href} {...props}>
    {children}
    {arrow && (
      <Spaced left="xs">
        <ArrowRight/>
      </Spaced>
    )}
  </Root>
)

Link.propTypes = {
  arrow: bool
}

Link.defaultProps = {
  arrow: false
}

export default Link
