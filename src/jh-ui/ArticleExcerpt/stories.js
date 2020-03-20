import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrap from '../ThemeWrap'
import ThemeContext from '../../context/theme'
import ArticleExcerpt from './index'

export default {
  title: 'ArticleExcerpt',
  decorators: [
    renderStory => (
      <div style={{ width: '400px' }}>
        <ThemeWrap>{renderStory()}</ThemeWrap>
      </div>
    ),
    withKnobs,
    withA11y
  ]
}

export const Basic = () => (
  <ThemeContext.Consumer>
    {({ theme }) => (
      <ArticleExcerpt
        theme={theme}
        link="/"
        image={{ publicURL: 'https://via.placeholder.com/1200x800.png' }}
        date={new Date('November 5, 2018')}
        title="Implicit State Sharing in React & Vue"
        excerpt="Learn to use React's Context API and provide/inject in Vue to share state between related components without resorting to a global data store."
      />
    )}
  </ThemeContext.Consumer>
)
