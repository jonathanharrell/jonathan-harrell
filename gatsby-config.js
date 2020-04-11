const colors = require('./colors')
const website = require('./website-config')

require('dotenv').config()

module.exports = {
  siteMetadata: {
    siteUrl: website.url,
    title: website.title,
    description: website.description,
    banner: website.logo,
    headline: website.headline,
    siteLanguage: website.siteLanguage,
    ogLanguage: website.ogLanguage,
    author: website.author,
    twitterUsername: website.twitterUsername,
    facebookAppId: website.facebookAppId
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        head: false
      }
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
              maxWidth: 2048
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static'
            }
          },
          'gatsby-remark-prismjs',
          {
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
          include: /svgs/
        }
      }
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/svgs`,
        name: 'svgs'
      }
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: 'Roboto',
            variants: ['400', '400i', '500', '700'],
            subsets: ['latin-ext']
          },
          {
            family: 'DM Serif Display',
            variants: ['400'],
            subsets: ['latin-ext']
          },
          {
            family: 'DM Serif Text',
            variants: ['400'],
            subsets: ['latin-ext']
          }
        ]
      }
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-transition-link',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.body }]
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        description
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Jonathan Harrell RSS Feed'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: website.title,
        short_name: website.shortName,
        description: website.description,
        background_color: website.backgroundColor,
        theme_color: website.themeColor,
        display: 'standalone',
        icon: website.favicon
      }
    },
    // 'gatsby-plugin-offline',
    'gatsby-plugin-netlify' // make sure to keep it last in the array
  ]
}
