import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ContentWrap from '../components/ContentWrap'
import BlogRoll from '../components/BlogRoll'
import ExperimentRoll from '../components/ExperimentRoll'
import Heading from '../jh-ui/Heading'
import Spaced from '../jh-ui/Spaced'
import Text from '../jh-ui/Text'
import Padded from '../jh-ui/Padded'
import Button from '../jh-ui/Button'
import Link from '../jh-ui/Link'
import { colors } from '../jh-ui/themes'
import ThemeContext from '../context/theme'
import SectionHeader from '../jh-ui/SectionHeader'

const HeaderWrap = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`

const HeaderContentWrap = styled.div`
  max-width: 28rem;
`

const BlogRollWrap = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`

const ExperimentRollWrap = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundInverse};
`

export const IndexPageTemplate = ({
                                    image,
                                    title,
                                    subheading
                                  }) => {
  const { toggleTheme } = useContext(ThemeContext)

  return (
    <>
      <HeaderWrap>
        <Padded vertical="3x">
          <ContentWrap>
            <HeaderContentWrap>
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
                <Text>I’m a designer and developer who is passionate about creating great user experiences, crafting
                  solid
                  code
                  and overall making the web a better place.</Text>
              </Spaced>
              <Spaced top="l">
                <Button onClick={toggleTheme}>Toggle theme</Button>
              </Spaced>
            </HeaderContentWrap>
          </ContentWrap>
        </Padded>
      </HeaderWrap>
      <BlogRollWrap>
        <Padded vertical="3x">
          <ContentWrap>
            <SectionHeader>
              <Heading level={2}>
                Recent Articles
              </Heading>
              <Link arrow={true} to="/blog">
                View all
              </Link>
            </SectionHeader>
            <BlogRoll/>
          </ContentWrap>
        </Padded>
      </BlogRollWrap>
      <ExperimentRollWrap>
        <Padded vertical="3x">
          <ContentWrap>
            <SectionHeader>
              <Heading level={2} color={colors.white}>
                Recent Experiments
              </Heading>
              <Link
                href="https://codepen.io/jonathanharrell/"
                arrow={true}
              >
                View all
              </Link>
            </SectionHeader>
            <ExperimentRoll/>
          </ContentWrap>
        </Padded>
      </ExperimentRollWrap>
    </>
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
        markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
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
