import React from 'react'
import PropTypes from 'prop-types'
import { Root } from './styles'

const Tag = React.forwardRef(
  ({ hoverable, element, children, ...props }, ref) => (
    <Root
      ref={ref}
      hoverable={hoverable.toString()}
      as={element || 'span'}
      {...props}
    >
      {children}
    </Root>
  )
)

Tag.propTypes = {
  hoverable: PropTypes.bool,
  element: PropTypes.string
}

Tag.defaultProps = {
  hoverable: true
}

export default Tag
