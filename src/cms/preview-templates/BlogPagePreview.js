import React from 'react'
import PropTypes from 'prop-types'
import previewStyle from '../preview-style'

const BlogPagePreview = ({ entry }) => {
  return (
    <div style={previewStyle}>
      <h1>{entry.getIn(['data', 'title'])}</h1>
    </div>
  )
}

BlogPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  })
}

export default BlogPagePreview
