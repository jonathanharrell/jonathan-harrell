import React from 'react'
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby'

const Favicon = () => (
  <Helmet>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href={`${withPrefix('/')}img/apple-touch-icon.png`}
    />
    <link
      rel="icon"
      type="image/png"
      href={`${withPrefix('/')}img/favicon-32x32.png`}
      sizes="32x32"
    />
    <link
      rel="icon"
      type="image/png"
      href={`${withPrefix('/')}img/favicon-16x16.png`}
      sizes="16x16"
    />
    <link
      rel="mask-icon"
      href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
      color="#ff4400"
    />
  </Helmet>
)

export default Favicon
