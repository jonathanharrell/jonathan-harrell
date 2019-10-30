import React from 'react'
import styled from 'styled-components'
import { oneOf, string } from 'prop-types'

const Root = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.375rem;
  padding: 0 ${({ theme }) => theme.spacing.m};
  border-width: 1px;
  border-style: solid;
  border-color: var(--buttonBorderPrimary);
  border-radius: 2em;
  background-color: var(--buttonBackgroundPrimary);
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme }) => theme.fontSizes.m.mobile};
  line-height: 1;
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`

const Button = ({ children, order, element, ...props }) => (
  <Root order={order} as={element} {...props}>
    {children}
  </Root>
)

Button.propTypes = {
  order: oneOf(['primary', 'secondary']),
  element: string
}

Button.defaultProps = {
  order: 'primary',
  element: 'button'
}

export default Button
