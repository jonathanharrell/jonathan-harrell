export const colors = {
  white: 'hsl(0, 0%, 100%)'
}

export const fonts = {
  sansSerif: `"Roboto", "Helvetica Neue", "Helvetica", "Arial", san-serif`,
  serif: `"DM Serif Text", serif`
}

export const fontSizes = {
  xxxl: {
    mobile: '2.125rem',
    tablet: '',
    desktop: '2.875rem'
  },
  xxl: {
    mobile: '1.875rem',
    tablet: '',
    desktop: '2.375rem'
  },
  xl: {
    mobile: '1.625rem',
    tablet: '',
    desktop: '1.875rem'
  },
  l: {
    mobile: '1.25rem',
    tablet: '',
    desktop: '1.5rem'
  },
  m: {
    mobile: '1rem',
    tablet: '',
    desktop: '1.1875rem'
  },
  s: {
    mobile: '0.875rem',
    tablet: '',
    desktop: '0.875rem',
  }
}

export const spacing = {
  xxxl: '2rem',
  xxl: '1.75rem',
  xl: '1.5rem',
  l: '1.25rem',
  m: '1rem',
  s: '0.75rem'
}

export const breakpoints = {
  mobile: '30rem',
  tablet: '45rem',
  desktop: '64rem',
  desktopLarge: '90rem'
}

export default {
  light: {
    mode: 'light',
    colors: {
      text: 'hsl(210, 67%, 11%)',
      textLighter: 'hsl(210, 15%, 60%)',
      background: 'hsl(210, 0%, 98%)',
      primary: 'hsl(210, 67%, 11%)'
    },
    fonts,
    fontSizes,
    spacing
  },
  dark: {
    mode: 'dark',
    colors: {
      text: 'hsl(0, 0%, 100%)',
      textLighter: 'hsl(210, 15%, 60%)',
      background: 'hsl(210, 67%, 11%)',
      primary: 'hsl(210, 67%, 11%)'
    },
    fonts,
    fontSizes,
    spacing
  }
}
