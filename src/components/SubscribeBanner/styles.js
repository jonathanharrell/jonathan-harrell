import styled from 'styled-components'
import Input from '../../jh-ui/Input'
import Button from '../../jh-ui/Button'

export const SubscribeBannerWrap = styled.aside`
  position: relative;
  background-color: var(--backgroundSubscribeBanner);
`

export const SubscribeContentWrap = styled.div`
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
  }
`

export const SubscribeForm = styled.form`
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-top: 0 !important;
  }
`

export const SubscribeFormContent = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    justify-content: center;
  }
`

export const SubscribeInput = styled(Input)`
  width: 20rem;
  max-width: 100%;
  background-color: var(--backgroundInverse);
  color: var(--textInverse);
`

export const SubscribeButton = styled(Button)`
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 0 !important;
    margin-left: ${({ theme }) => theme.spacing.m};
    border-radius: 4px;
  }
`
