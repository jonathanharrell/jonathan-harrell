export const colors = {
  blueDarkest: 'hsl(210, 67%, 11%)',
  blueDarker: 'hsl(210, 67%, 13%)',
  black: 'hsl(0, 0%, 0%)',
  white: 'hsl(0, 0%, 100%)',
  red: 'hsl(10, 66%, 56%)',
  redDark: 'hsl(10, 66%, 45%)',
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
  s: '0.75rem',
  xs: '0.5rem'
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
      text: colors.blueDarkest,
      textLighter: 'hsl(210, 15%, 60%)',
      textInverse: 'hsl(0, 0%, 100%)',
      backgroundPrimary: colors.white,
      backgroundSecondary: 'hsl(210, 0%, 95%)',
      backgroundInverse: colors.blueDarkest,
      backgroundElevatedPrimary: '',
      backgroundElevatedSecondary: '',
      backgroundElevatedInverse: colors.blueDarker,
      primary: colors.blueDarkest,
      accent: colors.red
    },
    fonts,
    fontSizes,
    spacing
  },
  dark: {
    mode: 'dark',
    colors: {
      text: colors.white,
      textLighter: 'hsl(210, 15%, 60%)',
      textInverse: colors.white,
      backgroundPrimary: colors.black,
      backgroundSecondary: 'hsl(0, 0%, 10%)',
      backgroundInverse: colors.black,
      backgroundElevatedPrimary: '',
      backgroundElevatedSecondary: 'hsl(0, 0%, 15%)',
      backgroundElevatedInverse: 'hsl(0, 0%, 10%)',
      primary: colors.blueDarkest,
      accent: colors.red
    },
    fonts,
    fontSizes,
    spacing
  }
}
