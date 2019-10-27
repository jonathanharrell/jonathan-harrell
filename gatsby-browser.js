import React from 'react'
import 'prismjs/themes/prism-solarizedlight.css'

export const wrapRootElement = ({ element }) => {
  return (
    <div className="test">{element}</div>
  )
}
