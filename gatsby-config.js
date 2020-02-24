const colors = require('./colors')

module.exports = {
  siteMetadata: {
    title: 'Gatsby + Netlify CMS Starter',
    description:
      'This repo contains an example business website that is built with Gatsby, and Netlify CMS.It follows the JAMstack architecture by using Git as a single source of truth, and Netlify for continuous deployment, and CDN distribution.',
  },
  plugins: [
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
    // {
    //   resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
    //   options: {
    //     develop: true, // Activates purging in npm run develop
    //   },
    // }, // must be after other CSS plugins
    // 'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
