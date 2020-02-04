import React from 'react'
import { select, withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import ThemeWrap from '../ThemeWrap'
import ThemeContext from '../../context/theme'
import ArticleExcerpt from './index'

export default {
  title: 'ArticleExcerpt',
  decorators: [
    renderStory => <ThemeWrap>{renderStory()}</ThemeWrap>,
    withKnobs,
    withA11y
  ]
}

export const Basic = () => {
  const imagePosition = select('Image Position', ['top', 'left', 'right'], 'top')
  const imageRatio = select('Image Ratio', [1 / 2, 2 / 3], 1 / 2)

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <ArticleExcerpt
          theme={theme}
          link="/"
          image="https://via.placeholder.com/1200x800.png"
          imagePosition={imagePosition}
          imageRatio={imageRatio}
          date={new Date('November 5, 2018')}
          title="Implicit State Sharing in React & Vue"
          excerpt="Learn to use React's Context API and provide/inject in Vue to share state between related components without resorting to a global data store."
          tags={['JavaScript', 'React', 'Vue']}
        />
      )}
    </ThemeContext.Consumer>
  )
}
