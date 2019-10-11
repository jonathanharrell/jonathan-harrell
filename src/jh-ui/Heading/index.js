import React from 'react'
import styled from 'styled-components'
import { oneOf, string } from 'prop-types'
import { breakpoints } from '../themes'

const getFontFamily = (theme, level) => {
  switch (level) {
    case 5:
    case 6:
      return theme.fonts.sansSerif
    default:
      return theme.fonts.serif
  }
}

const getFontSize = (theme, level, breakpoint) => {
  switch (level) {
    case 1:
      return theme.fontSizes.xxxl[breakpoint]
    case 2:
      return theme.fontSizes.xxl[breakpoint]
    case 3:
      return theme.fontSizes.xl[breakpoint]
    case 4:
      return theme.fontSizes.l[breakpoint]
    case 5:
      return theme.fontSizes.m[breakpoint]
    case 6:
      return theme.fontSizes.s[breakpoint]
    default:
      return theme.fontSizes.xxl[breakpoint]
  }
}

const getLineHeight = level => {
  switch (level) {
    case 4:
      return 1.2
    case 5:
      return 1.3
    case 6:
      return 1.4
    default:
      return 1.1
  }
}

const getFontWeight = level => {
  switch (level) {
    case 5:
      return 700
    case 6:
      return 500
    default:
      return 400
  }
}

const Root = styled.h1`
  margin: 0;
  font-family: ${({ theme, level }) => getFontFamily(theme, level)};
  font-size: ${({ theme, level }) => getFontSize(theme, level, 'mobile')};
  line-height: ${({ level }) => getLineHeight(level)};
  font-weight: ${({ level }) => getFontWeight(level)};
  ${({ level }) => level === 6 ? 'text-transform: uppercase' : null}
  color: ${({ theme }) => theme.colors.text};
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${({ theme, level }) => getFontSize(theme, level, 'tablet')};
  }
  
  @media (min-width: ${breakpoints.desktop}) {
    font-size: ${({ theme, level }) => getFontSize(theme, level, 'desktop')};
  }
`

const Heading = ({ children, level, element }) => (
  <Root level={level} as={element ? element : `h${level}`}>
    {children}
  </Root>
)

Heading.propTypes = {
  level: oneOf([1, 2, 3, 4, 5, 6]),
  element: string
}

Heading.defaultProps = {
  level: 1
}

export default Heading
