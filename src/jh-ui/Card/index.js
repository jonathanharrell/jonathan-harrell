import React from 'react'
import styled from 'styled-components'
import { bool, string } from 'prop-types'
import Padded from '../Padded'

const Root = styled.div`
  box-shadow: ${({ theme }) => theme.elevations.medium};
  transition: box-shadow 0.2s ${({ theme }) => theme.beziers.out};

  > * {
    height: 100%;
  }

  &:hover,
  &:focus,
  &:active {
    box-shadow: ${({ theme }) => theme.elevations.high};
  }
`

const Card = ({ children, padding, element, ...props }) => (
  <Root as={element} {...props}>
    <Padded all={padding ? 'xxl' : undefined}>
      <div>
        {children}
      </div>
    </Padded>
  </Root>
)

Card.propTypes = {
  padding: bool,
  element: string
}

Card.defaultProps = {
  padding: true
}

export default Card
