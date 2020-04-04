import React from 'react'
import PropTypes from 'prop-types'
import kebabCase from 'lodash/kebabCase'
import Spaced from '../../jh-ui/Spaced'
import Padded from '../../jh-ui/Padded'
import Heading from '../../jh-ui/Heading'
import Text from '../../jh-ui/Text'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import { CodepenFigure, CodepenImage, CodepenLink, CodepenWrap } from './styles'

const Codepen = ({ id, title, thumbnailUrl }) => (
  <Spaced vertical="xl">
    <CodepenWrap
      padding={false}
      aria-labelledby={`${kebabCase(title)}-label`}
      element="article"
    >
      <CodepenLink
        href={`https://codepen.io/jonathanharrell/details/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ScreenReaderText>Go to experiment</ScreenReaderText>
      </CodepenLink>
      <CodepenFigure>
        <CodepenImage src={thumbnailUrl} alt="" />
      </CodepenFigure>
      <Padded vertical="2x" horizontal="xl">
        <div>
          <Heading level={5} id={`${kebabCase(title)}-label`} element="h2">
            {title}
          </Heading>
          <Spaced top="xs">
            <Text element="p" color="textLighter">
              Click here to view the experiment on Codepen
            </Text>
          </Spaced>
        </div>
      </Padded>
    </CodepenWrap>
  </Spaced>
)

Codepen.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired
}

export default Codepen
