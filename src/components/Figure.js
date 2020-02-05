import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../context/theme'

const Figure = ({ src, alt }) => {
  const { themeName } = useContext(ThemeContext)
  const [finalSrc, setFinalSrc] = useState()

  // switch to dark version of image if using dark theme
  // NOTE: this relies on strict image naming convention
  useEffect(() => {
    if (themeName === 'dark') {
      const re = new RegExp('\/static\/(.+)\/(.*?).svg')
      const [, , filename] = src.match(re)
      if (filename) setFinalSrc(`/img/${filename}-dark.svg`)
    }

    if (themeName === 'light') {
      setFinalSrc(src)
    }
  }, [themeName])

  const handleError = () => {
    setFinalSrc(src)
  }

  return (
    <figure>
      <img src={finalSrc} alt={alt} onError={handleError}/>
    </figure>
  )
}

export default Figure
