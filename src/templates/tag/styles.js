import styled from 'styled-components'
import { motion } from 'framer-motion'
import ArticleExcerpt from '../../jh-ui/ArticleExcerpt'

export const TagIndexWrap = styled.div`
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

export const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ArticlesWrap = styled(motion.div)`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
`

export const BlogExcerptWrap = styled(motion.div)`
  grid-column: 1 / -1;
  height: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 6;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: auto / span 4;
  }
`

export const BlogExcerpt = styled(ArticleExcerpt)`
  height: 100%;
  background-color: var(--backgroundElevatedSecondary);
`
