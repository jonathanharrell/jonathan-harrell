import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrap from '../ThemeWrap'
import ThemeContext from '../../context/theme'
import SectionHeader from './index'
import Heading from '../Heading'

export default {
  title: 'SectionHeader',
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
        <>
          <SectionHeader theme={theme}>
            <Heading>
              Section header 1
            </Heading>
          </SectionHeader>
          <SectionHeader theme={theme}>
            <Heading>
              Section header 2
            </Heading>
          </SectionHeader>
        </>
      )}
    </ThemeContext.Consumer>
  )
}
