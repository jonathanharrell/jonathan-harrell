import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentWrap from './ContentWrap'
import Padded from '../jh-ui/Padded'
import Text from '../jh-ui/Text'
import Button from '../jh-ui/Button'
import Input from '../jh-ui/Input'
import Spaced from '../jh-ui/Spaced'
import X from '../img/icons/x.svg'

const SubscribeBannerWrap = styled.section`
  position: relative;
  background-color: var(--backgroundSubscribeBanner);
`

const CloseButton = styled(Button)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.m};
  right: ${({ theme }) => theme.spacing.m};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 50%;
    right: ${({ theme }) => theme.spacing.xl};
    transform: translateY(-50%);
  }
`

const SubscribeBannerContentWrap = styled.div`
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const EmailInput = styled(Input)`
  width: 15rem;
  max-width: 100%;
`

const SubscribeBanner = () => {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const subscribeBannerDismissed = localStorage.getItem('subscribe-banner-dismissed')
    setDismissed(!!subscribeBannerDismissed)
  }, [])

  const dismiss = () => {
    setDismissed(true)
    localStorage.setItem('subscribe-banner-dismissed', true)
  }

  return !dismissed ? (
    <SubscribeBannerWrap>
      <CloseButton unstyled onClick={dismiss}>
        <X/>
      </CloseButton>
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
                <EmailInput type="email" placeholder="Your email address"/>
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
  ) : null
}

export default SubscribeBanner
