import React, { useRef } from 'react'
import { NavLink, Wrap } from './styles'
import ArrowUp from '../../svgs/icons/arrow-up.svg'

const PageTitle = ({ children, ...props }) => {
  const titleContent = useRef()
  const pageTitle = titleContent.current ? titleContent.current.innerText : ''

  return (
    <div {...props}>
      <Wrap>
        <NavLink
          id="nav-skip-link"
          href="#site-navigation"
          tabIndex="-1"
          aria-label={`${pageTitle}, skip to navigation`}
        >
          <ArrowUp />
        </NavLink>
        <span ref={titleContent}>{children}</span>
      </Wrap>
    </div>
  )
}

export default PageTitle
