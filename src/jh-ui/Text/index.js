import React from 'react'
import styled from 'styled-components'
import { oneOf, string } from 'prop-types'

const getFontSize = (theme, order, breakpoint) => {
  switch (order) {
    case 'caption':
      return theme.fontSizes.m[breakpoint]
    case 'meta':
      return theme.fontSizes.s[breakpoint]
    case 'body':
    default:
      return theme.fontSizes.m[breakpoint]
  }
}

const getColor = ({ order, color }) => {
  if (color) return `var(--${color})`

  switch (order) {
    case 'caption':
    case 'meta':
      return 'var(--textLighter)'
    default:
      return 'var(--text)'
  }
}

const Root = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme, order }) => getFontSize(theme, order, 'mobile')};
  line-height: 1.5;
  font-weight: ${({ order }) => order === 'meta' ? 500 : 400};
  ${({ order }) => order === 'meta' ? 'text-transform: uppercase' : null};
  color: ${({ order, color }) => getColor({ order, color })};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme, order }) => getFontSize(theme, order, 'tablet')};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme, order }) => getFontSize(theme, order, 'desktop')};
  }
`

const Text = ({ children, order, color, element, ...props }) => (
  <Root order={order} color={color} as={element} {...props}>
    {children}
  </Root>
)

Text.propTypes = {
  order: oneOf(['body', 'caption', 'meta']),
  color: oneOf(['text', 'textLighter', 'textInverse']),
  element: string
}

Text.defaultProps = {
  order: 'body',
  element: 'p'
}

export default Text
