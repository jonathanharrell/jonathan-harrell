import React from 'react'
import styled from 'styled-components'
import ContentWrap from './ContentWrap'
import Padded from '../jh-ui/Padded'
import Text from '../jh-ui/Text'
import Button from '../jh-ui/Button'
import { breakpoints } from '../jh-ui/themes'

const SubscribeBannerWrap = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`

const SubscribeBannerContentWrap = styled.div`
  text-align: center;

  @media (min-width: ${breakpoints.mobile}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const SubscribeBanner = () => (
  <SubscribeBannerWrap>
    <ContentWrap>
      <Padded vertical="xl">
        <SubscribeBannerContentWrap>
          <Text order="body">
            Sign up for periodic updates
          </Text>
          <form>
            <input type="email"/>
            <Button>
              Subscribe
            </Button>
          </form>
        </SubscribeBannerContentWrap>
      </Padded>
    </ContentWrap>
  </SubscribeBannerWrap>
)

export default SubscribeBanner
