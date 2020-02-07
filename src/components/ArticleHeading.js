import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import Heading from '../jh-ui/Heading'
import Hash from '../img/icons/hash.svg'
import ScreenReaderText from '../jh-ui/ScreenReaderText'

const HeadingWrap = styled.div`
  position: relative;
  z-index: 0 !important;
`

const HeadingLink = styled.a`
  display: none;
  position: absolute;
  top: 2rem;
  padding-top: 0.5rem;
  color: var(--textLighter);
  text-decoration: none;
  transform: translateX(calc(-100% - 0.5rem));

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  }

  svg {
    pointer-events: none;
  }

  &:hover,
  &:focus {
    svg {
      transform: scale(1.1);
    }
  }

  &:focus {
    box-shadow: none;
  }

  &:focus-within {
    svg {
      box-shadow: 0 0 0 0.2em var(--selection);
    }
  }

  &:active {
    svg {
      transform: scale(0.98);
    }
  }
`

const ArticleHeading = ({ children, ...props }) => {
  const id = kebabCase(children)

  const copyLink = event => {
    event.preventDefault()

    const el = document.createElement('textarea')
    el.value = event.target.href
    document.body.appendChild(el)

    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  return (
    <HeadingWrap>
      <Heading level={2} id={id} {...props}>
        {children}
      </Heading>
      <Tippy
        content="Copy link to this section"
        placement="bottom"
        animation="shift-away"
        theme="jh"
      >
        <HeadingLink
          href={`#${id}`}
          aria-labelledby={`${id}-label`}
          onClick={copyLink}
        >
          <ScreenReaderText id={`${id}-label`}>
            Link to this section
          </ScreenReaderText>
          <Hash/>
        </HeadingLink>
      </Tippy>
    </HeadingWrap>
  )
}

export default ArticleHeading
