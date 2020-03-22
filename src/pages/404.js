import React from 'react'
import styled from 'styled-components'
import Heading from '../jh-ui/Heading'
import Spaced from '../jh-ui/Spaced'
import Text from '../jh-ui/Text'
import Layout from '../components/Layout'
import ContentWrap from '../components/ContentWrap'
import NotFound from '../img/not-found.svg'

const HeaderWrap = styled.header`
  flex: 1;
  padding-top: ${({ theme }) => theme.spacing['3x']};
  background-color: var(--backgroundPrimary);
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['5x']};
  }
`

const NotFoundContentWrap = styled(ContentWrap)`
  padding-top: ${({ theme }) => theme.spacing['3x']};
  padding-bottom: ${({ theme }) => theme.spacing['3x']};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
    padding-bottom: ${({ theme }) => theme.spacing['4x']};
  }
`


const NotFoundPage = () => (
  <Layout>
    <HeaderWrap aria-labelledby="about-label">
      <NotFoundContentWrap>
        <Spaced bottom="3x">
          <NotFound/>
        </Spaced>
        <Heading level={1} id="about-label">
          Oops! That page can’t be found.
        </Heading>
        <Spaced top="m">
          <Text>
            It looks like nothing was found at this location.
          </Text>
        </Spaced>
      </NotFoundContentWrap>
    </HeaderWrap>
  </Layout>
)

export default NotFoundPage
