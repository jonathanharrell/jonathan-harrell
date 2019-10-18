import React from 'react'
import styled from 'styled-components'
import { string } from 'prop-types'
import Padded from '../Padded'

const Root = styled.div`
  box-shadow: 0 2px 28px rgba(0, 0, 0, 0.15);
  
  > * {
    height: 100%;
  }
`

const Card = ({ children, element, ...props }) => (
  <Root as={element} {...props}>
    <Padded all="xxl">
      <div>
        {children}
      </div>
    </Padded>
  </Root>
)

Card.propTypes = {
  element: string
}

Card.defaultProps = {
  arrow: false
}

export default Card
