import React from 'react'
import PropTypes from 'prop-types'
import { Root } from './styles'

const Alert = ({ children, order, ...props }) => (
  <Root order={order} {...props}>
    {children}
  </Root>
)

Alert.propTypes = {
  order: PropTypes.oneOf(['info', 'warning', 'danger'])
}

Alert.defaultProps = {
  order: 'danger'
}

export default Alert
