import React from 'react'
import { withKnobs, select, text } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrapper from '../ThemeWrapper'
import ThemeContext from '../../context/theme'
import Button from './index'

export default {
  title: 'Button',
  decorators: [
    renderStory => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  const order = select('Order', ['primary', 'secondary'], 'primary')
  const element = text('Element', '')

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <Button theme={theme} order={order} element={element}>
          This is a button
        </Button>
      )}
    </ThemeContext.Consumer>
  )
}
