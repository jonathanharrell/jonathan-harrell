import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql, Link as GatsbyLink } from 'gatsby'
import { kebabCase } from 'lodash'
import Padded from '../jh-ui/Padded'
import Heading from '../jh-ui/Heading'
import Spaced from '../jh-ui/Spaced'
import ScreenReaderText from '../jh-ui/ScreenReaderText'
import Text from '../jh-ui/Text'
import Card from '../jh-ui/Card'
import Layout from '../components/Layout'
import ContentWrap from '../components/ContentWrap'
import Seo from '../components/seo'
import website from '../../website-config'


const TagsIndexWrap = styled.div`
  flex: 1;
  background-color: var(--backgroundPrimary);
`

const Header = styled.header`
  padding-top: ${({ theme }) => theme.spacing['3x']};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['5x']};
  }
`

const TagsWrap = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
`

const TagCard = styled(Card)`
  grid-column: 1 / -1;
  position: relative;
  background-color: var(--backgroundElevatedSecondary);

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: auto / span 6;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 4;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: auto / span 3;
  }
`

const Link = styled(GatsbyLink)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
`

const TagsPage = ({ location, data: { allMdx: { group: tags } } }) => (
  <Layout>
    <Seo
      title={`Tags | ${website.titleAlt}`}
      pathname={location.pathname}
      description="Stay update to date on the latest developments in HTML, CSS and Javascript. Read Jonathan Harrell's blog for tips, tricks and techniques."
    />
    <TagsIndexWrap>
      <Header>
        <ContentWrap>
          <Padded vertical="3x">
            <Heading level={1}>
              Tags
            </Heading>
          </Padded>
        </ContentWrap>
      </Header>
      <section
        id="tags"
        aria-labelledby="tags-label"
      >
        <Spaced bottom="5x">
          <ContentWrap>
            <ScreenReaderText>
              <Heading level={2} id="tags-label">
                Tags
              </Heading>
            </ScreenReaderText>
            <TagsWrap>
              {tags.map(tag => (
                <TagCard key={tag.fieldValue}>
                  <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    <ScreenReaderText>
                      Go to tag
                    </ScreenReaderText>
                  </Link>
                  <Heading level={3}>
                    {tag.fieldValue}
                  </Heading>
                  <Text order="body" color="textLighter">
                    {tag.totalCount} articles
                  </Text>
                </TagCard>
              ))}
            </TagsWrap>
          </ContentWrap>
        </Spaced>
      </section>
    </TagsIndexWrap>
  </Layout>
)

TagsPage.propTypes = {
  location: PropTypes.object,
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired
        })
      ).isRequired
    }).isRequired
  }).isRequired
}

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

