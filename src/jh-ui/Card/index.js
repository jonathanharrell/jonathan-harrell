import React from 'react'
import PropTypes from 'prop-types'
import Padded from '../Padded'
import { Root } from './styles'

const Card = ({ padding, hover, element, children, ...props }) => (
  <Root as={element} hover={hover} {...props}>
    <Padded all={padding ? 'xxl' : undefined}>
      <div>{children}</div>
    </Padded>
  </Root>
)

Card.propTypes = {
  padding: PropTypes.bool,
  hover: PropTypes.bool,
  element: PropTypes.string
}

Card.defaultProps = {
  padding: true,
  hover: true
}

export default Card
