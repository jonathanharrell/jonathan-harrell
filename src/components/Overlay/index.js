import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

const Overlay = ({ children }) => {
  useEffect(() => {
    setTimeout(() => {
      const gatsbyWrap = document.getElementById('___gatsby')
      gatsbyWrap.setAttribute('aria-hidden', 'true')
    }, 0)

    return () => {
      const gatsbyWrap = document.getElementById('___gatsby')
      gatsbyWrap.removeAttribute('aria-hidden')
    }
  })

  return ReactDOM.createPortal(children, document.getElementById('modal'))
}

export default Overlay
