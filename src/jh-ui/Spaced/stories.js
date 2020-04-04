import React from 'react'
import { select, withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrap from '../ThemeWrap'
import ThemeContext from '../../context/theme'
import Spaced from './index'
import { spacing } from '../theme'

export default {
  title: 'Spaced',
  decorators: [
    renderStory => <ThemeWrap>{renderStory()}</ThemeWrap>,
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  const all = select('All', ['', ...Object.keys(spacing)], undefined)
  const vertical = select('Vertical', ['', ...Object.keys(spacing)], undefined)
  const horizontal = select(
    'Horizontal',
    ['', ...Object.keys(spacing)],
    undefined
  )
  const top = select('Top', ['', ...Object.keys(spacing)], undefined)
  const right = select('Right', ['', ...Object.keys(spacing)], undefined)
  const bottom = select('Bottom', ['', ...Object.keys(spacing)], undefined)
  const left = select('Left', ['', ...Object.keys(spacing)], undefined)

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
          <div
            style={{
              width: '200px',
              height: '100px',
              backgroundColor: 'lightgray'
            }}
          />
          <div
            style={{
              width: '200px',
              height: '100px',
              backgroundColor: 'lightgray'
            }}
          />
        </Spaced>
      )}
    </ThemeContext.Consumer>
  )
}
