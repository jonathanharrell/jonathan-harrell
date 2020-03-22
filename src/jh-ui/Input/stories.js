import React from 'react'
import { text, withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrap from '../ThemeWrap'
import ThemeContext from '../../context/theme'
import Input from './index'

export default {
  title: 'Input',
  decorators: [
    renderStory => <ThemeWrap>{renderStory()}</ThemeWrap>,
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  const value = text('Value', 'Default value')

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <Input theme={theme} value={value} placeholder="This is a placeholder"/>
      )}
    </ThemeContext.Consumer>
  )
}
