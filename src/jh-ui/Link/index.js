import React from 'react'
import styled from 'styled-components'
import { bool, oneOf, string } from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import Spaced from '../Spaced'
import ArrowLeft from '../../img/icons/arrow-left.svg'
import ArrowRight from '../../img/icons/arrow-right.svg'

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

    .arrow {
      transform: ${({ arrow }) => arrow === 'left' ? 'translateX(-0.1em)' : 'translateX(0.1em)'};
    }
  }

  .arrow {
    transition: transform 0.2s ${({ theme }) => theme.beziers.out};
  }
`

const Link = ({ children, arrow, arrowPosition, href, element, ...props }) => (
  <Root as={element ? element : (href ? 'a' : undefined)} arrow={arrowPosition} href={href} {...props}>
    {(arrow && arrowPosition === 'left') && (
      <Spaced right="xs">
        <ArrowLeft className="arrow"/>
      </Spaced>
    )}
    {children}
    {(arrow && arrowPosition === 'right') && (
      <Spaced left="xs">
        <ArrowRight className="arrow"/>
      </Spaced>
    )}
  </Root>
)

Link.propTypes = {
  arrow: bool,
  arrowPosition: oneOf(['left', 'right']),
  element: string
}

Link.defaultProps = {
  arrow: false,
  arrowPosition: 'right'
}

export default Link
