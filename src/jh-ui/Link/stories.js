import React from 'react'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrap from '../ThemeWrap'
import ThemeContext from '../../context/theme'
import Link from './index'

export default {
  title: 'Link',
  decorators: [
    renderStory => <ThemeWrap>{renderStory()}</ThemeWrap>,
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  const arrow = boolean('Arrow', false)
  const anchor = boolean('Anchor', false)

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <Link theme={theme} arrow={arrow} anchor={anchor}>
          Link
        </Link>
      )}
    </ThemeContext.Consumer>
  )
}
