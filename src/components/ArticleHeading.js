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
  top: 0;
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
      <HeadingLink href={`#${id}`} aria-label="Link to this section">
        <Hash/>
      </HeadingLink>
    </HeadingWrap>
  )
}

export default ArticleHeading
