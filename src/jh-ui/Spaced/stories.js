import React from 'react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrapper from '../ThemeWrapper'
import ThemeContext from '../../context/theme'
import Spaced from './index'
import Text from '../Text'
import { spacing } from '../themes'

export default {
  title: 'Spaced',
  decorators: [
    renderStory => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  const all = select('All', ['', ...Object.keys(spacing)], '')
  const vertical = select('Vertical', ['', ...Object.keys(spacing)], '')
  const horizontal = select('Horizontal', ['', ...Object.keys(spacing)], '')
  const top = select('Top', ['', ...Object.keys(spacing)], '')
  const right = select('Right', ['', ...Object.keys(spacing)], '')
  const bottom = select('Bottom', ['', ...Object.keys(spacing)], '')
  const left = select('Left', ['', ...Object.keys(spacing)], '')

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <Spaced
          theme={theme}
          all={all}
          vertical={vertical}
          horizontal={horizontal}
          top={top}
          right={right}
          bottom={bottom}
          left={left}
        >
          <Text>This is some text</Text>
        </Spaced>
      )}
    </ThemeContext.Consumer>
  )
}
