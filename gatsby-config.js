const colors = require('./colors')

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.jonathan-harrell.com',
    title: 'Jonathan Harrell | CSS Blogger & Teacher, UI/UX Designer, Front-End Developer',
    description: 'Want to stay up-to-date on the latest developments in CSS and JavaScript? Get tips, tutorials and thoughts from designer/developer Jonathan Harrell.'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-relative-images'
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          'gatsby-remark-prismjs',
          {
            // this plugin converts svg images to inline svgs within mardown
            // and replaces hardcoded colors with CSS variables
            resolve: 'gatsby-remark-jh-inline-svg',
            options: {
              colors
            }
          },
          'gatsby-remark-jh-codepen-block'
        ]
      }
    },
    'gatsby-remark-reading-time',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /img/
        }
      }
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            'family': 'Roboto',
            'variants': [
              '400',
              '400i',
              '500',
              '700'
            ],
            'subsets': [
              'latin-ext'
            ]
          },
          {
            'family': 'DM Serif Display',
            'variants': [
              '400'
            ],
            'subsets': [
              'latin-ext'
            ]
          },
          {
            'family': 'DM Serif Text',
            'variants': [
              '400'
            ],
            'subsets': [
              'latin-ext'
            ]
          }
        ],
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ]
}
