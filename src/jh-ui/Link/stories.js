import React from 'react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrapper from '../ThemeWrapper'
import ThemeContext from '../../context/theme'
import Link from './index'

export default {
  title: 'Link',
  decorators: [
    renderStory => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  const arrow = boolean('Arrow', false)

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <Link theme={theme} arrow={arrow}>
          Link
        </Link>
      )}
    </ThemeContext.Consumer>
  )
}
