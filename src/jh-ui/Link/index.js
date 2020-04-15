import React from 'react'
import PropTypes from 'prop-types'
import { ArrowLeft, ArrowRight } from 'react-feather'
import Spaced from '../Spaced'
import { Root } from './styles'

const Link = ({ arrow, arrowPosition, href, element, children, ...props }) => (
  <Root
    as={element ? element : href ? 'a' : undefined}
    arrow={arrowPosition}
    href={href}
    {...props}
  >
    {arrow && arrowPosition === 'left' && (
      <Spaced right="xs">
        <ArrowLeft className="arrow" />
      </Spaced>
    )}
    {children}
    {arrow && arrowPosition === 'right' && (
      <Spaced left="xs">
        <ArrowRight className="arrow" />
      </Spaced>
    )}
  </Root>
)

Link.propTypes = {
  arrow: PropTypes.bool.isRequired,
  arrowPosition: PropTypes.oneOf(['left', 'right']),
  href: PropTypes.string,
  element: PropTypes.string
}

Link.defaultProps = {
  arrow: false,
  arrowPosition: 'right'
}

export default Link
