import React from 'react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrapper from '../ThemeWrapper'
import ThemeContext from '../../context/theme'
import ArticleExcerpt from './index'

export default {
  title: 'ArticleExcerpt',
  decorators: [
    renderStory => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <ArticleExcerpt
          theme={theme}
          link="/"
          date={new Date('November 5, 2018')}
          title="Implicit State Sharing in React & Vue"
          excerpt="Learn to use React's Context API and provide/inject in Vue to share state between related components without resorting to a global data store."
          tags={['JavaScript', 'React', 'Vue']}
        />
      )}
    </ThemeContext.Consumer>
  )
}
