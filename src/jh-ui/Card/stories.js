import React from 'react'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrap from '../ThemeWrap'
import ThemeContext from '../../context/theme'
import Card from './index'
import Text from '../Text'

export default {
  title: 'Card',
  decorators: [
    renderStory => <ThemeWrap>{renderStory()}</ThemeWrap>,
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  const padding = boolean('Padding', true)
  const hoverable = boolean('Hoverable', true)

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <Card theme={theme} padding={padding} hoverable={hoverable}>
          <Text element="span">Card</Text>
        </Card>
      )}
    </ThemeContext.Consumer>
  )
}
