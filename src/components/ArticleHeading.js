import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import Heading from '../jh-ui/Heading'
import Hash from '../img/icons/hash.svg'

const HeadingWrap = styled.div`
  position: relative;
`

const HeadingLink = styled.a`
  display: none;
  position: absolute;
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
      <HeadingLink href={`#${id}`}>
        <Hash/>
      </HeadingLink>
      <Heading level={2} id={id} {...props}>
        {children}
      </Heading>
    </HeadingWrap>
  )
}

export default ArticleHeading
