import React from 'react'
import PropTypes from 'prop-types'
import previewStyle from '../preview-style'

const ResumePagePreview = ({ entry, widgetsFor }) => {
  const jobs = widgetsFor('history').getIn(['data', 'job'])
  const tools = widgetsFor('tools').getIn(['data', 'tool'])
  const openSourceProjects = widgetsFor('opensource').getIn(['data', 'project'])

  return (
    <div style={previewStyle}>
      <h1>{entry.getIn(['data', 'title'])}</h1>
      <h2>{entry.getIn(['data', 'history', 'title'])}</h2>
      {jobs && (
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>
              {job.toJSON().company}
              <br />
              <strong>{job.toJSON().position}</strong>
              <br />
              {job.toJSON().startdate} – {job.toJSON().enddate}
              <br />
              {job.toJSON().description}
            </li>
          ))}
        </ul>
      )}
      <h2>{entry.getIn(['data', 'education', 'title'])}</h2>
      {widgetsFor('education').getIn(['widgets', 'description'])}
      <h2>{entry.getIn(['data', 'tools', 'title'])}</h2>
      {tools && (
        <ul>
          {tools.map((tool, index) => (
            <li key={index}>{tool.toJSON().name}</li>
          ))}
        </ul>
      )}
      <h2>{entry.getIn(['data', 'opensource', 'title'])}</h2>
      {openSourceProjects && (
        <ul>
          {openSourceProjects.map((project, index) => (
            <li key={index}>
              <a href={project.toJSON().link}>{project.toJSON().name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

ResumePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
    getAsset: PropTypes.func
  }),
  widgetFor: PropTypes.func,
  widgetsFor: PropTypes.func
}

export default ResumePagePreview
