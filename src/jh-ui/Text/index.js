import React from 'react'
import styled from 'styled-components'
import { oneOf, string } from 'prop-types'
import { breakpoints } from '../themes'

const getFontSize = (theme, order, breakpoint) => {
  switch (order) {
    case 'caption':
      return theme.fontSizes.s[breakpoint]
    case 'meta':
      return theme.fontSizes.s[breakpoint]
    case 'body':
    default:
      return theme.fontSizes.m[breakpoint]
  }
}

const getColor = (theme, order) => {
  switch (order) {
    case 'caption':
    case 'meta':
      return theme.colors.textLighter
    default:
      return theme.colors.text
  }
}

const Root = styled.p`
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme, order }) => getFontSize(theme, order, "mobile")};
  line-height: 1.5;
  font-weight: ${({ order }) => order === 'meta' ? 500 : 400};
  ${({ order }) => order === 'meta' ? 'text-transform: uppercase' : null};
  color: ${({ theme, order }) => getColor(theme, order)};
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${({ theme, order }) => getFontSize(theme, order, 'tablet')};
  }
  
  @media (min-width: ${breakpoints.desktop}) {
    font-size: ${({ theme, order }) => getFontSize(theme, order, 'desktop')};
  }
`

const Text = ({ children, order, element, ...props }) => (
  <Root order={order} as={element} {...props}>
    {children}
  </Root>
)

Text.propTypes = {
  order: oneOf(['body', 'caption', 'meta']),
  element: string
}

Text.defaultProps = {
  order: 'body',
  element: 'p'
}

export default Text
