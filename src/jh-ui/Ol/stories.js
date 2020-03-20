import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrap from '../ThemeWrap'
import ThemeContext from '../../context/theme'
import Ol from './index'

export default {
  title: 'Ol',
  decorators: [
    renderStory => (
      <div style={{ marginLeft: '0.25rem' }}>
        <ThemeWrap>{renderStory()}</ThemeWrap>
      </div>
    ),
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <Ol theme={theme}>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </Ol>
      )}
    </ThemeContext.Consumer>
  )
}
