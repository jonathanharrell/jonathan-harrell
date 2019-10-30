import React from 'react'
import PropTypes from 'prop-types'

export default function HTML(props) {
  const themeScript = `
    (function() {
      function setTheme(newTheme) {
        window.__theme = newTheme
        preferredTheme = newTheme
        document.body.className = 'theme-' + newTheme
      }
    
      var preferredTheme;
      
      try {
        preferredTheme = localStorage.getItem('theme');
      } catch (error) {}
    
      window.__setPreferredTheme = function(newTheme) {
        setTheme(newTheme);

        try {
          localStorage.setItem('theme', newTheme)
        } catch (error) {}
      }
    
      var darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')

      darkModeQuery.addListener(function(event) {
        window.__setPreferredTheme(event.matches ? 'dark' : 'light')
      });
    
      setTheme(preferredTheme || (darkModeQuery.matches ? 'dark' : 'light'));
    })();
  `

  return (
    <html {...props.htmlAttributes}>
    <head>
      <meta charSet="utf-8"/>
      <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {props.headComponents}
    </head>
    <body {...props.bodyAttributes}>
    <script dangerouslySetInnerHTML={{ __html: themeScript }}/>
    {props.preBodyComponents}
    <noscript key="noscript" id="gatsby-noscript">
      This app works best with JavaScript enabled.
    </noscript>
    <div
      key={`body`}
      id="___gatsby"
      dangerouslySetInnerHTML={{ __html: props.body }}
    />
    {props.postBodyComponents}
    </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
