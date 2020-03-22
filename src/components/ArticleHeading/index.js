import React from 'react'
import kebabCase from 'lodash/kebabCase'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import Heading from '../../jh-ui/Heading'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import { HeadingLink, HeadingWrap } from './styles'
import Hash from '../../img/icons/hash.svg'

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
          tabIndex="-1"
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
