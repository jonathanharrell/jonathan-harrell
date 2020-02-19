import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Text from '../jh-ui/Text'

const SvgWrap = styled.div`
  svg {
    width: 100%;
    height: auto;
  }
`

const Image = ({ src, alt, title }) => {
  const [markup, setMarkup] = useState('')

  // switch to dark version of image if using dark theme
  // NOTE: this relies on strict image naming convention
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchImage = async (src) => {
      try {
        const response = await fetch(src, {
          method: 'GET',
          signal
        })
        const text = await response.text()
        setMarkup(text)
      } catch (error) {
        console.error(error)
      }
    }

    if (src.endsWith('.svg')) {
      fetchImage(src)
    }

    return () => {
      controller.abort()
    }
  }, [src])

  const processedMarkup = useMemo(() => {
    return markup
      .replace(/#8D8DA6/g, 'var(--illustrationHeroShapeBackground)')
      .replace(/#DEDEE6/g, 'var(--illustrationLineShade1)')
      .replace(/#D4D4DD/g, 'var(--illustrationLineShade2)')
      .replace(/#C9C9D6/g, 'var(--illustrationLineShade3)')
      .replace(/#C1C1D2/g, 'var(--illustrationLineShade3)')
      .replace(/#F9F9FB/g, 'var(--backgroundSecondary)')
      .replace(/#2E3138/g, 'var(--text)')
  }, [markup])

  return (
    <>
      {processedMarkup && (
        <SvgWrap dangerouslySetInnerHTML={{ __html: processedMarkup }}/>
      )}
      <noscript>
        <img src={src} alt={alt}/>
      </noscript>
      {title && <Text order="body" color="textLighter" element="figcaption">{title}</Text>}
    </>
  )
}

export default Image
