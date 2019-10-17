import React from 'react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrapper from '../ThemeWrapper'
import ThemeContext from '../../context/theme'
import Card from './index'
import Text from '../Text'

export default {
  title: 'Card',
  decorators: [
    renderStory => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <Card theme={theme}>
          <Text element="span">Card</Text>
        </Card>
      )}
    </ThemeContext.Consumer>
  )
}
