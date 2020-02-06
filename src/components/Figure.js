import React, { useEffect, useMemo, useState } from 'react'

const Figure = ({ src, alt }) => {
  const [markup, setMarkup] = useState('')

  // switch to dark version of image if using dark theme
  // NOTE: this relies on strict image naming convention
  useEffect(() => {
    if (src.endsWith('.svg')) {
      fetchImage(src)
    }
  }, [])

  const processedMarkup = useMemo(() => {
    return markup
      .replace(/#8D8DA6/g, 'var(--textLighter)')
      .replace(/#C1C1D2/g, 'var(--textLight)')
  }, [markup])

  const fetchImage = async (src) => {
    try {
      const response = await fetch(src, {
        method: 'GET'
      })
      const text = await response.text()
      setMarkup(text)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {processedMarkup && (
        <figure dangerouslySetInnerHTML={{ __html: processedMarkup }}/>
      )}
      <noscript>
        <figure>
          <img src={src} alt={alt}/>
        </figure>
      </noscript>
    </>
  )
}

export default Figure
