export const beziers = {
  in: 'cubic-bezier(0.94, 0.01, 0.83, 0.86)',
  out: 'cubic-bezier(0.2, 0.91, 0.85, 0.96)',
  inOut: 'cubic-bezier(0.82, 0.09, 0.4, 0.92)',
  bounce: 'cubic-bezier(0.68, -0.28, 0.18, 1.26)'
}

export const colors = {
  blueDarkest: 'hsl(210, 67%, 11%)',
  blueDarker: 'hsl(210, 67%, 13%)',
  black: 'hsl(0, 0%, 0%)',
  white: 'hsl(0, 0%, 100%)',
  red: 'hsl(5, 66%, 56%)',
  redDark: 'hsl(10, 66%, 40%)',
}

export const elevations = {
  low: '0 0 0 1px rgba(0,0,0,0.05),0 1px 2px rgba(0,0,0,0.12)',
  medium: '0 0 0 1px rgba(0,0,0,0.05),0 5px 10px rgba(0,0,0,0.15)',
  high: '0 0 0 1px rgba(0,0,0,0.05),0 10px 20px rgba(0,0,0,0.2)'
}

export const fonts = {
  sansSerif: `"Roboto", "Helvetica Neue", "Helvetica", "Arial", san-serif`,
  serif: `"DM Serif Text", serif`,
  serifDisplay: `"DM Serif Display", serif`,
}

export const fontSizes = {
  xxxl: {
    mobile: '2.125rem',
    tablet: '2.5rem',
    desktop: '2.875rem'
  },
  xxl: {
    mobile: '1.875rem',
    tablet: '2rem',
    desktop: '2.25rem'
  },
  xl: {
    mobile: '1.625rem',
    tablet: '1.75rem',
    desktop: '1.875rem'
  },
  l: {
    mobile: '1.25rem',
    tablet: '1.375rem',
    desktop: '1.5rem'
  },
  m: {
    mobile: '1rem',
    tablet: '1rem',
    desktop: '1.125rem'
  },
  s: {
    mobile: '0.875rem',
    tablet: '0.875rem',
    desktop: '0.875rem',
  }
}

export const spacing = {
  '5x': '5rem',
  '4x': '4rem',
  '3x': '3rem',
  '2x': '2rem',
  xxl: '1.75rem',
  xl: '1.5rem',
  l: '1.25rem',
  m: '1rem',
  s: '0.75rem',
  xs: '0.5rem'
}

export const breakpoints = {
  mobile: '30rem',
  tablet: '40rem',
  desktop: '64rem',
  desktopLarge: '80rem'
}

export default {
  beziers,
  colors,
  elevations,
  fonts,
  fontSizes,
  spacing,
  breakpoints
}
