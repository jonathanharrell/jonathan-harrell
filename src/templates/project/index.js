import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import Padded from '../../jh-ui/Padded'
import Heading from '../../jh-ui/Heading'
import Text from '../../jh-ui/Text'
import Seo from '../../components/seo'
import ContentWrap from '../../components/ContentWrap'
import PageTitle from '../../components/PageTitle'
import ProjectImage from '../../components/ProjectImage'
import website from '../../../website-config'

export const ProjectWrap = styled.div`
  flex: 1;
  background-color: var(--backgroundPrimary);
`

export const Header = styled.header`
  padding-top: ${({ theme }) => theme.spacing['3x']};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['5x']};
  }
`

export const ProjectContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`

export const ProjectContent = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 2 / -2;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 3 / -3;
  }
`

export const ProjectTemplate = ({
  location,
  id,
  title,
  description,
  role,
  coverImage
}) => {
  return (
    <>
      <Seo
        title={`${title} | ${website.titleAlt}`}
        pathname={location.pathname}
        description={description}
        banner={
          coverImage && coverImage.light
            ? coverImage.light.publicURL
            : undefined
        }
        article
      />
      <ProjectWrap>
        <Header>
          <ContentWrap>
            <Padded vertical="3x">
              <div>
                <Text order="meta">{role}</Text>
                <PageTitle>
                  <Heading level={1}>{title}</Heading>
                </PageTitle>
              </div>
            </Padded>
          </ContentWrap>
        </Header>
        <div>
          <ContentWrap>
            <ProjectContentWrap>
              <ProjectContent>
                <ProjectImage image={coverImage} />
              </ProjectContent>
            </ProjectContentWrap>
          </ContentWrap>
        </div>
      </ProjectWrap>
    </>
  )
}

ProjectTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  coverImage: PropTypes.shape({
    light: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object.isRequired
      }).isRequired
    }).isRequired,
    dark: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

const Project = ({ location, data: { mdx: post } }) => (
  <ProjectTemplate
    location={location}
    id={post.id}
    title={post.frontmatter.title}
    description={post.frontmatter.description}
    role={post.frontmatter.role}
    coverImage={post.frontmatter.coverimage}
  />
)

Project.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      id: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        coverimage: PropTypes.shape({
          light: PropTypes.shape({
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.object.isRequired
            }).isRequired
          }).isRequired,
          dark: PropTypes.shape({
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.object.isRequired
            }).isRequired
          }).isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default Project

export const pageQuery = graphql`
  query ProjectByID($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        description
        role
        coverimage {
          light {
            childImageSharp {
              fluid(maxWidth: 790) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          dark {
            childImageSharp {
              fluid(maxWidth: 790) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
