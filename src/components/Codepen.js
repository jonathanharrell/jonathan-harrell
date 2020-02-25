import React from 'react'
import styled from 'styled-components'
import Card from '../jh-ui/Card'
import Spaced from '../jh-ui/Spaced'
import Padded from '../jh-ui/Padded'
import Heading from '../jh-ui/Heading'
import Text from '../jh-ui/Text'
import ScreenReaderText from '../jh-ui/ScreenReaderText'
import kebabCase from 'lodash/kebabCase'

const CodepenWrap = styled(Card)`
  position: relative;
  background-color: var(--backgroundCode);
  border-radius: 6px;

  > div {
    display: flex;
    align-items: stretch;
  }
`

const CodepenLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:focus {
    box-shadow: none;
  }
`

const CodepenFigure = styled.figure`
  position: relative;
  flex: 0 0 6rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 0 8rem;
  }
`

const CodepenImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100% !important;
  object-fit: cover;
`

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
        <ScreenReaderText>
          Go to experiment
        </ScreenReaderText>
      </CodepenLink>
      <CodepenFigure>
        <CodepenImage src={thumbnailUrl} alt=""/>
      </CodepenFigure>
      <Padded vertical="2x" horizontal="xl">
        <div>
          <Heading
            level={5}
            id={`${kebabCase(title)}-label`}
            element="h2"
          >
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

export default Codepen
