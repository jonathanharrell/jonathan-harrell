import styled from 'styled-components'
import Card from '../../jh-ui/Card'
import Button from '../../jh-ui/Button'
import Input from '../../jh-ui/Input'

export const SubscribeBannerWrap = styled.aside`
  position: relative;
  background-color: var(--backgroundSubscribeBanner);
`

export const SubscribeContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-gap: 0 ${({ theme }) => theme.spacing.xxl};
  }
`

export const SubscribeCard = styled(Card)`
  grid-column: 1 / -1;
  background-color: var(--backgroundInverse);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 2 / span 10;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 3 / span 8;
  }
`

export const SubscribeCardContent = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;

    > * {
      flex: 1;
    }
  }
`

export const SubscribeForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background-color: var(--backgroundElevatedInverse);

  input {
    width: 100%;
  }
`

export const CloseButton = styled(Button)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.m};
  right: ${({ theme }) => theme.spacing.m};
  color: var(--textLighter);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    right: ${({ theme }) => theme.spacing.m};
  }

  &:hover,
  &:focus {
    color: var(--textLight);
    transform: scale(1.05);
  }

  &:active {
    color: var(--textLighter);
    transform: scale(0.98);
  }
`

export const SubscribeInput = styled(Input)`
  background-color: var(--backgroundInverse);
  color: var(--textInverse);
`
