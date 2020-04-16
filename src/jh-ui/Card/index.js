import React from 'react'
import PropTypes from 'prop-types'
import Padded from '../Padded'
import { Root } from './styles'

const Card = ({ padding, hoverable, element, children, ...props }) => (
  <Root as={element} hoverable={hoverable} {...props}>
    <Padded all={padding ? 'xxl' : undefined}>
      <div>{children}</div>
    </Padded>
  </Root>
)

Card.propTypes = {
  padding: PropTypes.bool,
  hoverable: PropTypes.bool,
  element: PropTypes.string
}

Card.defaultProps = {
  padding: true,
  hoverable: true
}

export default Card
