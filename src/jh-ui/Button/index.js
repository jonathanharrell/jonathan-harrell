import React from 'react'
import styled from 'styled-components'
import { bool, oneOf, string } from 'prop-types'

const Root = styled.button`
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme }) => theme.fontSizes.m.mobile};
  line-height: 1;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  ${({ unstyled, order, theme }) => unstyled ? `
    padding: 0;
    border: 0;
    background-color: transparent;
  ` : `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.375rem;
    padding: 0 ${theme.spacing.m};
    border-width: 1px;
    border-style: solid;
    border-color: ${order === 'primary' ? 'var(--buttonBorderPrimary)' : 'var(--buttonBorderSecondary)'};
    border-radius: 2em;
    background-color: ${order === 'primary' ? 'var(--buttonBackgroundPrimary)' : 'var(--buttonBackgroundSecondary)'};
    color: ${order === 'primary' ? 'var(--buttonTextPrimary)' : 'var(--buttonTextSecondary)'};
  `}
`

const Button = React.forwardRef(({ children, order, unstyled, element, ...props }, ref) => (
  <Root ref={ref} order={order} unstyled={unstyled} as={element} {...props}>
    {children}
  </Root>
))

Button.propTypes = {
  order: oneOf(['primary', 'secondary']),
  unstyled: bool,
  element: string
}

Button.defaultProps = {
  order: 'primary',
  unstyled: false,
  element: 'button'
}

export default Button
