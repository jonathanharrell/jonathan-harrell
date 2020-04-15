import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Padded from '../../jh-ui/Padded'
import Heading from '../../jh-ui/Heading'
import Seo from '../../components/seo'
import ContentWrap from '../../components/ContentWrap'
import PageTitle from '../../components/PageTitle'
import website from '../../../website-config'
import Text from '../../jh-ui/Text'

export const ResumeIndexWrap = styled.div`
  flex: 1;
  background-color: var(--backgroundPrimary);
`

export const Header = styled.header`
  padding-top: ${({ theme }) => theme.spacing['3x']};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['5x']};
  }
`

const ResumePageTemplate = ({ location, title }) => (
  <>
    <Seo
      title={`${title} | ${website.titleAlt}`}
      pathname={location.pathname}
      description="Jonathan Harrell is a UI/UX designer and front-end developer. He specializes in and blogs about HTML and CSS. Learn more."
    />
    <ResumeIndexWrap>
      <Header>
        <ContentWrap>
          <Padded vertical="3x">
            <PageTitle>
              <Heading level={1}>{title || 'Jonathan Harrell'}</Heading>
              <Text order="body">UI/UX Designer & Front-End Developer</Text>
            </PageTitle>
          </Padded>
        </ContentWrap>
      </Header>
      <div>
        <ContentWrap>
          <Padded vertical="3x">
            <div>
              <ul>
                <li>
                  <Text order="meta">InVision</Text>
                  <Text order="meta">September 2018 – Present</Text>
                  <Heading level={2}>Front-End Engineer</Heading>
                  <ul>
                    <li>
                      Worked with an international financial institution to
                      design and build internal monitoring applications using
                      React and Redux
                    </li>
                    <li>
                      Built and managed the front-end web strategy for a major
                      commercial bathroom supplier over a 3 year period
                    </li>
                    <li>
                      Worked with over 30 clients to design user experience
                      flows and interfaces, from the user interview stage
                      through to high fidelity mockups
                    </li>
                    <li>
                      Built modern single-page applications with React and Vue
                      for a variety of industries
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </Padded>
        </ContentWrap>
      </div>
    </ResumeIndexWrap>
  </>
)

const ResumePage = ({ location, data: { mdx: post } }) => {
  const { title } = post.frontmatter

  return <ResumePageTemplate location={location} title={title} />
}

export default ResumePage

export const resumePageQuery = graphql`
  query ResumePage {
    mdx(frontmatter: { templateKey: { eq: "resume-page" } }) {
      frontmatter {
        title
      }
    }
  }
`
