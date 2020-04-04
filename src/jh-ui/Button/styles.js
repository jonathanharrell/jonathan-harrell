import styled from 'styled-components'

export const getBorderColor = order => {
  switch (order) {
    case 'accent':
      return 'var(--accent)'
    case 'primary':
      return 'var(--buttonBorderPrimary)'
    case 'secondary':
    default:
      return 'var(--buttonBorderSecondary)'
  }
}

export const getBackgroundColor = order => {
  switch (order) {
    case 'accent':
      return 'var(--accent)'
    case 'primary':
      return 'var(--buttonBackgroundPrimary)'
    case 'secondary':
    default:
      return 'var(--buttonBackgroundSecondary)'
  }
}

export const getTextColor = order => {
  switch (order) {
    case 'accent':
      return 'white'
    case 'primary':
      return 'var(--buttonTextPrimary)'
    case 'secondary':
    default:
      return 'var(--buttonTextSecondary)'
  }
}

export const Root = styled.button`
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme }) => theme.fontSizes.m.mobile};
  line-height: 1;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  transition: all 0.2s ${({ theme }) => theme.colors.out};
  cursor: pointer;

  ${({ unstyled, order, size, theme }) =>
    unstyled
      ? `
    padding: 0;
    border: 0;
    background-color: transparent;
  `
      : `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: ${size === 'large' ? '3rem' : '2.375rem'};
    padding: 0 ${size === 'large' ? theme.spacing.xl : theme.spacing.m};
    border-width: 1px;
    border-style: solid;
    border-color: ${getBorderColor(order)};
    border-radius: 2em;
    background-color: ${getBackgroundColor(order)};
    color: ${getTextColor(order)};

    &:hover {
      box-shadow: var(--elevationMedium);
    }

    &:focus {
      box-shadow: var(--elevationMedium), 0 0 0 0.2em var(--selection)
    }

    &:active {
      box-shadow: var(--elevationMedium);
      transform: scale(0.98);
    }
  `}
`
