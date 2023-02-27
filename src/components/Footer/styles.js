import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import ContentWrap from '../ContentWrap/'

export const FooterWrap = styled.footer`
  background-color: var(--backgroundPrimary);
  color: var(--textLighter);
`

const footerContentBreakpoint = '35rem'

export const FooterContentWrap = styled(ContentWrap)`
  text-align: center;

  @media (min-width: ${footerContentBreakpoint}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export const Link = styled(GatsbyLink)`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.s.mobile};
  text-decoration: none;
  color: var(--textLighter);
  transition: opacity 0.2s ${({ theme }) => theme.beziers.out};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.s.tablet};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.s.desktop};
  }

  &:hover,
  &:focus {
    opacity: 0.5;
  }

  &:active {
    opacity: 0.75;
  }
`

export const SocialLinksWrap = styled.section`
  margin-top: ${({ theme }) => theme.spacing.s};

  @media (min-width: ${footerContentBreakpoint}) {
    flex: 1;
    margin-top: 0;
    text-align: right;
  }
`
