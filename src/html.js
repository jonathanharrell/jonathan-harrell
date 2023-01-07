import React from 'react'
import PropTypes from 'prop-types'

export default function HTML(props) {
  const jsScript = `
    (function() {
      document.body.className = ''
    })()
  `

  const themeScript = `
    (function() {
      function setTheme(newTheme) {
        window.__theme = newTheme
        preferredTheme = newTheme
        document.body.setAttribute('data-theme', newTheme)
        window.dispatchEvent(new CustomEvent('themeChange', {
          detail: newTheme
        }))
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

  const style = `
    .screen-reader-text {
      clip: rect(0 0 0 0);
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      margin: -1px;
      padding: 0;
      border: 0;
      white-space: nowrap;
    }
  `

  return (
    <html {...props.htmlAttributes} lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <link
          rel="webmention"
          href="https://webmention.io/www.jonathan-harrell.com/webmention"
        />
        <link
          rel="pingback"
          href="https://webmention.io/www.jonathan-harrell.com/xmlrpc"
        />
      </head>
      <body className="no-js" {...props.bodyAttributes}>
        <script dangerouslySetInnerHTML={{ __html: jsScript }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript" className="noscript">
          This site works best with JavaScript enabled.
        </noscript>
        <div
          id="alert-assertive"
          role="region"
          aria-live="assertive"
          className="screen-reader-text"
        />
        <div
          id="alert-polite"
          role="region"
          aria-live="polite"
          className="screen-reader-text"
        />
        <div id="modal" />
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
  postBodyComponents: PropTypes.array
}
