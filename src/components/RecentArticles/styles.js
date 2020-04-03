import styled from 'styled-components'
import { motion } from 'framer-motion'
import ArticleExcerpt from '../../jh-ui/ArticleExcerpt'

export const RecentArticlesWrap = styled(motion.div)`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl} 0;
  grid-template-columns: repeat(12, 1fr);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-gap: ${({ theme }) => theme.spacing.xxl};
  }

  > *:nth-child(4) {
    display: none;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      display: block;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      display: none;
    }
  }
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
