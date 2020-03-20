import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrap from '../ThemeWrap'
import ThemeContext from '../../context/theme'
import ScreenReaderText from './index'

export default {
  title: 'ScreenReaderText',
  decorators: [
    renderStory => <ThemeWrap>{renderStory()}</ThemeWrap>,
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <ScreenReaderText theme={theme}>
          This is only visible to a screen reader
        </ScreenReaderText>
      )}
    </ThemeContext.Consumer>
  )
}
