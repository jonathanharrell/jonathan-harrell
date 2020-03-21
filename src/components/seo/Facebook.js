import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

const Facebook = ({ url, type, title, desc, image, locale, appId }) => (
  <Helmet>
    <meta property="og:locale" content={locale}/>
    <meta property="og:url" content={url}/>
    <meta property="og:type" content={type}/>
    <meta property="og:title" content={title}/>
    <meta property="og:description" content={desc}/>
    <meta property="og:image" content={image}/>
    <meta property="og:image:alt" content={desc}/>
    {appId && <meta property="fb:app_id" content={appId}/>}
  </Helmet>
)

export default Facebook

Facebook.propTypes = {
  url: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  appId: PropTypes.string,
}

Facebook.defaultProps = {
  type: 'website'
}
