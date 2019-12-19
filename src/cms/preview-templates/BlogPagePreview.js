import React from 'react'
import PropTypes from 'prop-types'

const BlogPagePreview = ({ entry }) => {
  return (
    <div style={{
      fontFamily: `'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'`,
      lineHeight: 1.4
    }}>
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
