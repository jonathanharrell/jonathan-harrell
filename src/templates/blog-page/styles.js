import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

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
