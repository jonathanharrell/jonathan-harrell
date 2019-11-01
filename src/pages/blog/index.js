import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import ContentWrap from '../../components/ContentWrap'
import Articles from '../../components/Articles'
import Heading from '../../jh-ui/Heading'
import Padded from '../../jh-ui/Padded'

const BlogIndexWrap = styled.div`
  flex: 1;
  background-color: var(--backgroundPrimary);
`

const Header = styled.header`
  text-align: center;
`

const ArticlesWrap = styled.section`

`

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <BlogIndexWrap>
          <Header>
            <ContentWrap>
              <Padded vertical="xxl">
                <Heading level={1}>
                  Articles
                </Heading>
              </Padded>
            </ContentWrap>
          </Header>
          <ArticlesWrap>
            <Padded bottom="3x">
              <ContentWrap>
                <Articles/>
              </ContentWrap>
            </Padded>
          </ArticlesWrap>
        </BlogIndexWrap>
      </Layout>
    )
  }
}
