import React from 'react'
import PropTypes from 'prop-types'
import previewStyle from '../preview-style'

const style = `
  img {
    width: 100%;
    height: auto;
  }
`

const ProjectPreview = ({ entry, widgetsFor, widgetFor, getAsset }) => {
  const sections = widgetsFor('section')

  return (
    <div style={previewStyle}>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <h1>{entry.getIn(['data', 'title'])}</h1>
      <p>
        <em>{entry.getIn(['data', 'role'])}</em>
      </p>
      <p>{entry.getIn(['data', 'description'])}</p>
      {sections && (
        <div>
          {sections.map((section, index) => (
            <section key={index}>
              <h2>{section.getIn(['data', 'title'])}</h2>
              <p>{section.getIn(['data', 'description'])}</p>
              <figure>
                <img
                  src={getAsset(section.toJSON().data.sectionimage.light).value}
                  alt=""
                  style={{ maxWidth: '100%' }}
                />
              </figure>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

ProjectPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
}

export default ProjectPreview
