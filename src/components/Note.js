import React from 'react'
import styled from 'styled-components'
import Text from '../jh-ui/Text'
import Spaced from '../jh-ui/Spaced'
import Padded from '../jh-ui/Padded'

const NoteWrap = styled.div`
  background-color: var(--backgroundCode);
  border-radius: 6px;
`

const Note = ({ type, children }) => (
  <Spaced bottom="m">
    <Padded all="m">
      <NoteWrap type={type}>
        <Text order="meta">
          Note
        </Text>
        <Text>
          {children}
        </Text>
      </NoteWrap>
    </Padded>
  </Spaced>
)

export default Note
