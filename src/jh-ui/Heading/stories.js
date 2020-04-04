import React from 'react'
import { select, text, withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrap from '../ThemeWrap'
import ThemeContext from '../../context/theme'
import Heading from './index'

export default {
  title: 'Heading',
  decorators: [
    renderStory => <ThemeWrap>{renderStory()}</ThemeWrap>,
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  const level = select('Level', [1, 2, 3, 4, 5, 6], 2)
  const color = select('Color', ['text', 'textLighter', 'textInverse'], '')
  const element = text('Element', '')

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <Heading theme={theme} level={level} color={color} element={element}>
          This is some text
        </Heading>
      )}
    </ThemeContext.Consumer>
  )
}

export const Multiline = () => {
  const level = select('Level', [1, 2, 3, 4, 5, 6], 2)
  const color = select('Color', ['text', 'textLighter', 'textInverse'], '')
  const element = text('Element', '')

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div style={{ width: '500px' }}>
          <Heading theme={theme} level={level} color={color} element={element}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque finibus nunc ac condimentum pellentesque. Sed in sem
            sed eros ornare feugiat et sit amet ligula.
          </Heading>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}
