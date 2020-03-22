import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import Padded from '../../jh-ui/Padded'
import Heading from '../../jh-ui/Heading'
import Spaced from '../../jh-ui/Spaced'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Text from '../../jh-ui/Text'
import Layout from '../../components/Layout/'
import ContentWrap from '../../components/ContentWrap/'
import Seo from '../../components/seo'
import website from '../../../website-config'
import { Header, Link, TagCard, TagsIndexWrap, TagsWrap } from './styles'

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

