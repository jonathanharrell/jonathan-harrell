import React from 'react'
import PropTypes from 'prop-types'

const AboutPagePreview = ({ entry, widgetFor, widgetsFor, getAsset }) => {
  const projects = widgetsFor('involvement').getIn(['data', 'project'])
  const usages = widgetsFor('what-i-use').getIn(['data', 'usage'])
  const image = entry.getIn(['data', 'image'])
  const imageAsset = getAsset(image).value

  return (
    <div style={{
      fontFamily: `'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'`,
      lineHeight: 1.4
    }}>
      {imageAsset && (
        <img src={imageAsset} alt="" style={{ maxWidth: '100%' }}/>
      )}
      <h1>{entry.getIn(['data', 'title'])}</h1>
      <p>{entry.getIn(['data', 'bio'])}</p>
      <h2>{entry.getIn(['data', 'involvement', 'title'])}</h2>
      {projects && (
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <strong>{project.toJSON().name}</strong>: {project.toJSON().description}
            </li>
          ))}
        </ul>
      )}
      <h2>{entry.getIn(['data', 'what-i-use', 'title'])}</h2>
      {usages && (
        <dl>
          {usages.map((usage, index) => (
            <li key={index}>
              <strong>{usage.toJSON().name}</strong>: {usage.toJSON().description}
            </li>
          ))}
        </dl>
      )}
    </div>
  )
}

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
    getAsset: PropTypes.func
  }),
  widgetFor: PropTypes.func,
  widgetsFor: PropTypes.func
}

export default AboutPagePreview
