import React from 'react'
import styled from 'styled-components'
import ContentWrap from './ContentWrap'
import Padded from '../jh-ui/Padded'
import Text from '../jh-ui/Text'
import Button from '../jh-ui/Button'
import Input from '../jh-ui/Input'
import Spaced from '../jh-ui/Spaced'

const SubscribeBannerWrap = styled.section`
  background-color: var(--backgroundPrimary);
`

const SubscribeBannerContentWrap = styled.div`
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const SubscribeBanner = () => (
  <SubscribeBannerWrap>
    <ContentWrap>
      <Padded vertical="m">
        <SubscribeBannerContentWrap>
          <Spaced vertical="xs" right="m">
            <Text order="body">
              Sign up for periodic updates
            </Text>
          </Spaced>
          <form>
            <Spaced vertical="xs" right="m">
              <Input type="email" placeholder="Your email address"/>
            </Spaced>
            <Spaced vertical="xs">
              <Button>
                Subscribe
              </Button>
            </Spaced>
          </form>
        </SubscribeBannerContentWrap>
      </Padded>
    </ContentWrap>
  </SubscribeBannerWrap>
)

export default SubscribeBanner
