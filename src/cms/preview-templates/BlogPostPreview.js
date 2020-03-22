import React from 'react'
import PropTypes from 'prop-types'
import previewStyle from '../preview-style'

const style = `
  img {
    width: 100%;
    height: auto;
  }
`

const BlogPostPreview = ({ entry, widgetFor }) => {
  return (
    <div style={previewStyle}>
      <style dangerouslySetInnerHTML={{ __html: style }}/>
      <h1>{entry.getIn(['data', 'title'])}</h1>
      {widgetFor('body')}
    </div>
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
