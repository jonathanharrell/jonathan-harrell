import React from 'react'
import { Hash } from 'react-feather'
import GithubSlugger from 'github-slugger'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import Heading from '../../jh-ui/Heading'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import { HeadingLink, HeadingWrap } from './styles'

const slugger = new GithubSlugger()

const ArticleHeading = ({ children, ...props }) => {
  slugger.reset()
  const id = slugger.slug(children)

  // copy page URL including section anchor
  // visitor will be jumped down to the shared section
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
          <Hash />
        </HeadingLink>
      </Tippy>
    </HeadingWrap>
  )
}

export default ArticleHeading
