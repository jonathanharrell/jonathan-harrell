import styled from 'styled-components'
import { motion } from 'framer-motion'
import ArticleExcerpt from '../../jh-ui/ArticleExcerpt'

export const ArticlesWrap = styled(motion.div)`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl} 0;
  grid-template-columns: repeat(12, 1fr);

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-gap: ${({ theme }) => theme.spacing.xxl};
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
