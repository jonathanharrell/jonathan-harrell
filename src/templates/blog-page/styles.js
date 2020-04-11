import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import Button from '../../jh-ui/Button'

export const BlogIndexWrap = styled.div`
  flex: 1;
  background-color: var(--backgroundPrimary);
`

export const Header = styled.header`
  padding-top: ${({ theme }) => theme.spacing['3x']};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['5x']};
  }
`

export const HeaderContentWrap = styled.div`
  position: relative;
`

export const ArticlesSkipLink = styled(Button)`
  clip: rect(0 0 0 0);
  position: absolute;
  top: 50%;
  left: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  background-color: var(--backgroundInverse);
  transform: translateY(-50%);
  transition: none;

  &:focus {
    clip: unset;
    width: auto;
    height: 2.375rem;
  }
`

export const ArticlesWrap = styled.section`
  box-shadow: none;
`

export const TagWrap = styled.li`
  display: inline-block;
  margin: 0 0.25rem 0.75rem 0;
`

export const Link = styled(GatsbyLink)`
  background-color: var(--backgroundTertiary);

  &:hover,
  &:focus,
  &:active {
    background-color: var(--backgroundSecondary);
  }
`
