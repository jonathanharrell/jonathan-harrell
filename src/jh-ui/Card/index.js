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
    box-shadow: ${({ theme, hover }) => hover ? theme.elevations.high : null};
    transform: ${({ hover }) => hover ? 'translateY(-0.25rem)' : ''};
  }

  &:focus-within {
    box-shadow: ${({ theme, hover }) => hover ? `${theme.elevations.high}, 0 0 0 0.2em var(--selection)` : null};
  }
`

const Card = ({ children, padding, hover, element, ...props }) => (
  <Root as={element} hover={hover} {...props}>
    <Padded all={padding ? 'xxl' : undefined}>
      <div>
        {children}
      </div>
    </Padded>
  </Root>
)

Card.propTypes = {
  padding: bool,
  hover: bool,
  element: string
}

Card.defaultProps = {
  padding: true,
  hover: true
}

export default Card
