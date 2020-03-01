import React from 'react'
import PropTypes from 'prop-types'

const IndexPagePreview = ({ entry }) => {
  const experiments = entry.getIn(['data', 'experiments'])

  return (
    <div style={{
      fontFamily: `'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'`,
      lineHeight: 1.4
    }}>
      <h1>{entry.getIn(['data', 'title'])}</h1>
      <p>{entry.getIn(['data', 'description'])}</p>
      {experiments && (
        <ul>
          {experiments.map(experiment => (
            <li key={experiment.toJSON().id}>
              <a
                href={`https://codepen.io/jonathanharrell/details/${experiment.toJSON().id}`}>
                {experiment.toJSON().title}
              </a>
              ({experiment.toJSON().date})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  })
}

export default IndexPagePreview
