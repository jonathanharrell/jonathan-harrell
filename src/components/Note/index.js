import React from 'react'
import PropTypes from 'prop-types'
import Text from '../../jh-ui/Text'
import Spaced from '../../jh-ui/Spaced'
import Padded from '../../jh-ui/Padded'
import { NoteWrap } from './styles'

const Note = ({ type, children }) => (
  <Spaced bottom="m">
    <Padded all="xxl">
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

Note.propTypes = {
  type: PropTypes.oneOf(['info', 'warning', 'danger']).isRequired
}

Note.defaultProps = {
  type: 'info'
}

export default Note
