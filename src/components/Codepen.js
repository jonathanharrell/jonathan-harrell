import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../jh-ui/Card'
import Spaced from '../jh-ui/Spaced'
import Padded from '../jh-ui/Padded'
import Heading from '../jh-ui/Heading'
import Text from '../jh-ui/Text'

const CodepenWrap = styled(Card)`
  position: relative;
  background-color: var(--backgroundCode);
  border-radius: 6px;

  > div {
    display: flex;
    align-items: center;
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
  width: 10rem;
  height: 10rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 8rem;
    height: 8rem;
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

const Codepen = ({ id }) => {
  const [pen, setPen] = useState({})
  const [penLoading, setPenLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPenLoading(true)
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://codepen.io/api/oembed?format=json&url=https://codepen.io/jonathanharrell/pen/${id}`)
        const data = await response.json()
        setPen(data)
      } catch (error) {
        console.error(error)
      } finally {
        setPenLoading(false)
      }
    }

    fetchData()
  }, [id])

  return (
    <Spaced vertical="xl">
      <CodepenWrap padding={false}>
        {penLoading && (
          <Padded all="xl">
            <div>
              <Text element="p" color="textLighter">
                Loading experiment...
              </Text>
            </div>
          </Padded>
        )}
        {(pen && !penLoading) && (
          <>
            <CodepenLink
              href={`https://codepen.io/jonathanharrell/details/${id}`}
              target="_blank"
              rel="noopener"
            />
            <CodepenFigure>
              <CodepenImage src={pen.thumbnail_url} alt=""/>
            </CodepenFigure>
            <Padded all="xl">
              <div>
                <Heading level={5} element="p">
                  {pen.title}
                </Heading>
                <Spaced top="xs">
                  <Text element="p" color="textLighter">
                    Click here to view the experiment on Codepen
                  </Text>
                </Spaced>
              </div>
            </Padded>
          </>
        )}
      </CodepenWrap>
    </Spaced>
  )
}

export default Codepen
