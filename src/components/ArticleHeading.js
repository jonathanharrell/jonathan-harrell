import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import Heading from '../jh-ui/Heading'
import Hash from '../img/icons/hash.svg'
import ScreenReaderText from '../jh-ui/ScreenReaderText'

const HeadingWrap = styled.div`
  position: relative;
`

const HeadingLink = styled.a`
  display: none;
  position: absolute;
  top: 6rem;
  height: 100%;
  padding-top: 0.5rem;
  color: var(--textLighter);
  text-decoration: none;
  transform: translateX(calc(-100% - 0.5rem));

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  }
`

const ArticleHeading = ({ children, ...props }) => {
  const id = kebabCase(children)

  return (
    <HeadingWrap>
      <Heading level={2} id={id} {...props}>
        {children}
      </Heading>
      <HeadingLink href={`#${id}`} aria-labelledby={`${id}-label`}>
        <ScreenReaderText id={`${id}-label`}>
          Link to this section
        </ScreenReaderText>
        <Hash/>
      </HeadingLink>
    </HeadingWrap>
  )
}

export default ArticleHeading
