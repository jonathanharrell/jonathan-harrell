import React from 'react'
import styled from 'styled-components'
import { bool, string } from 'prop-types'
import Padded from '../Padded'

const Root = styled.div`
  overflow: hidden;
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.elevations.medium};
  transition: all 0.2s ${({ theme }) => theme.beziers.out};

  > * {
    height: 100%;
  }

  &:hover,
  &:active {
    box-shadow: ${({ theme }) => theme.elevations.high};
    transform: translateY(-0.25rem);
  }

  &:focus-within {
    box-shadow: ${({ theme }) => theme.elevations.high}, 0 0 0 0.2em var(--selection);
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
