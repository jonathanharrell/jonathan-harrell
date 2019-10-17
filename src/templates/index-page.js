import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Heading from '../jh-ui/Heading'
import Spaced from '../jh-ui/Spaced'
import Text from '../jh-ui/Text'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import ContentWrapper from '../components/ContextWrapper'
import ThemeContext from '../context/theme'
import Button from '../jh-ui/Button'
import Link from '../jh-ui/Link'

export const IndexPageTemplate = ({
  image,
  title,
  subheading
}) => {
  const { toggleTheme } = useContext(ThemeContext)

  return (
    <ContentWrapper>
      {/*<div*/}
      {/*  style={{*/}
      {/*    backgroundImage: `url(${*/}
      {/*      !!image.childImageSharp ? image.childImageSharp.fluid.src : image*/}
      {/*    })`,*/}
      {/*    backgroundPosition: `top left`,*/}
      {/*    backgroundAttachment: `fixed`,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {title}*/}
      {/*  {subheading}*/}
      {/*</div>*/}
      <Heading level={1}>UI/UX Designer & Front-End Developer</Heading>
      <Spaced top="m">
        <Text>I’m a designer and developer who is passionate about creating great user experiences, crafting solid code and overall making the web a better place.</Text>
      </Spaced>
      <Spaced top="l">
        <Button onClick={toggleTheme}>Toggle theme</Button>
      </Spaced>
      <Heading level={2}>
        Recent Articles
      </Heading>
      <BlogRoll />
      <Link arrow={true} to="/blog">
        Read more
      </Link>
    </ContentWrapper>
  )
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
