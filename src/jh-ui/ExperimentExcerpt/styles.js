import styled from 'styled-components'
import Card from '../Card'
import Text from '../Text'

export const ExperimentCard = styled(Card)`
  position: relative;
`

export const Link = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;

  &:focus {
    box-shadow: none;
  }
`

export const ExperimentMeta = styled(Text)`
  display: flex;
  align-items: center;
`
