import React from 'react'
import Heading from '../../jh-ui/Heading'
import Spaced from '../../jh-ui/Spaced'
import Text from '../../jh-ui/Text'
import Layout from '../../components/Layout'
import { HeaderWrap, NotFoundContentWrap } from './styles'
import NotFound from '../../img/not-found.svg'

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
