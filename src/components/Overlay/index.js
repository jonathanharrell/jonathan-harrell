import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

const Overlay = ({ children }) => {
  useEffect(() => {
    setTimeout(() => {
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.position = 'fixed'

      const gatsbyWrap = document.getElementById('___gatsby')
      gatsbyWrap.setAttribute('aria-hidden', 'true')
      gatsbyWrap.style.opacity = '0.5'
      gatsbyWrap.style.pointerEvents = 'none'
    }, 0)

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''

      const gatsbyWrap = document.getElementById('___gatsby')
      gatsbyWrap.removeAttribute('aria-hidden')
      gatsbyWrap.style.opacity = '1'
      gatsbyWrap.style.pointerEvents = 'auto'
    }
  })

  return ReactDOM.createPortal(children, document.getElementById('modal'))
}

export default Overlay
