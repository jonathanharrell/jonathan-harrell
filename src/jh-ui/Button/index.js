import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import { Root } from './styles'

const Button = React.forwardRef(
  ({ order, size, unstyled, element, children, ...props }, ref) => (
    <Root
      ref={ref}
      order={order}
      size={size}
      unstyled={props.as !== GatsbyLink ? unstyled : undefined}
      as={element}
      {...props}
    >
      {children}
    </Root>
  )
)

Button.propTypes = {
  order: PropTypes.oneOf(['primary', 'secondary', 'accent']),
  size: PropTypes.oneOf(['medium', 'large']),
  unstyled: PropTypes.bool,
  element: PropTypes.string
}

Button.defaultProps = {
  order: 'primary',
  size: 'medium',
  unstyled: false,
  element: 'button'
}

export default Button
