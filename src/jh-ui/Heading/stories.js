import React from 'react'
import { withKnobs, select, text } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrapper from '../ThemeWrapper'
import ThemeContext from '../../context/theme'
import Heading from './index'

export default {
  title: 'Heading',
  decorators: [
    renderStory => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  const level = select('Level', [1, 2, 3, 4, 5, 6], 2)
  const element = text('Element', '')

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <Heading theme={theme} level={level} element={element}>
          This is some text
        </Heading>
      )}
    </ThemeContext.Consumer>
  )
}

export const Multiline = () => {
  const level = select('Level', [1, 2, 3, 4, 5, 6], 2)
  const element = text('Element', '')

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div style={{ width: '500px' }}>
          <Heading theme={theme} level={level} element={element}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus nunc ac condimentum pellentesque. Sed in sem sed eros ornare feugiat et sit amet ligula.
          </Heading>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}
