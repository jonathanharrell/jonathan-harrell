import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrap from '../ThemeWrap'
import ThemeContext from '../../context/theme'
import ExperimentExcerpt from './index'

export default {
  title: 'ExperimentExcerpt',
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
        <ExperimentExcerpt
          theme={theme}
          date={new Date('September 29, 2018')}
          title="Typographic Details Cheat Sheet"
          viewsCount={210}
        />
      )}
    </ThemeContext.Consumer>
  )
}
