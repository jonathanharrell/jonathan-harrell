import styled from 'styled-components'
import { motion } from 'framer-motion'
import ContentWrap from '../../components/ContentWrap/'
import Link from '../../jh-ui/Link'
import Text from '../../jh-ui/Text'
import Button from '../../jh-ui/Button'

export const ProgressBarWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 4;
`

export const ArticleWrap = styled.article`
  background-color: var(--backgroundPrimary);
`

export const ArticleHeader = styled.header`
  position: relative;
  overflow: hidden;
  background-color: var(--backgroundSecondary);
  clip-path: url(#wave);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 32.5rem;
  }

  &::after {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradientGray);
    mix-blend-mode: multiply;
    content: '';
  }

  ${ContentWrap} {
    position: relative;
    z-index: 1;
    height: 100%;
  }
`

export const ArticleHeaderContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  position: relative;
  height: 100%;
  padding: 8rem 0 6rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: 10rem;
  }
`

export const ArticleContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`

export const Figure = styled(motion.figure)`
  display: none;
  grid-column: 1 / -1;
  position: absolute;
  top: 0;
  right: -25%;
  height: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    right: 0;
  }

  > div {
    width: 100%;
    height: 100%;
  }

  svg {
    height: 100%;
  }
`

export const ArticleHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  grid-column: 1 / -1;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: auto / span 10;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 7;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: auto / span 6;
  }
`

export const TagLink = styled(Link)`
  span {
    transition: opacity 0.2s ${({ theme }) => theme.beziers.out};
  }

  &:hover,
  &:focus,
  &:active {
    span {
      color: var(--textLight);
    }
  }
`

export const Mask = styled.svg`
  clip: rect(0 0 0 0);
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  margin: -1px;
  padding: 0;
  border: 0;
  white-space: nowrap;
`

export const ArticleContent = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 2 / -2;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 3 / -3;
  }

  > p:first-child:first-letter {
    float: left;
    margin-right: 0.75rem;
    font-family: ${({ theme }) => theme.fonts.serifDisplay};
    font-size: 6rem;
    line-height: 0.85;
  }

  .gatsby-highlight {
    margin: ${({ theme }) => theme.spacing['2x']} -${({ theme }) =>
        theme.spacing.l} ${({ theme }) => theme.spacing['2x']};

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      margin-right: -${({ theme }) => theme.spacing.xl};
      margin-left: -${({ theme }) => theme.spacing.xl};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
      margin-right: -${({ theme }) => theme.spacing.xxl};
      margin-left: -${({ theme }) => theme.spacing.xxl};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      margin: ${({ theme }) => theme.spacing.xxl} 0;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      margin: ${({ theme }) => theme.spacing['2x']} 0;
    }

    pre {
      padding: ${({ theme }) => theme.spacing.xl};

      @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
        border-radius: 6px;
      }
    }
  }

  .anchor {
    display: none;
    position: absolute;
    font-size: 1em;
    line-height: 1.3;
    color: var(--accent);
    transform: translateX(calc(-100% - 0.25rem));

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      display: block;
    }
  }

  svg,
  img {
    width: 100%;
    height: auto;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`

export const ArticleMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
`

export const Tag = styled.li`
  display: inline-block;
  list-style: none;
`

export const ArticleLinksWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: baseline;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
  }
`

export const ShareLink = styled(Link)`
  margin-bottom: ${({ theme }) => theme.spacing.m};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 0;
  }

  svg {
    width: 1em;
    height: 1em;
  }
`

export const Divider = styled(Text)`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: inline;
  }
`

export const ScrollToTopLink = styled(Button)`
  padding: 0.4rem;
  background-color: var(--backgroundInverse);

  svg {
    width: auto;
  }
`

export const RecentArticlesWrap = styled.section`
  border-top: 1px solid var(--border);
  background-color: var(--backgroundPrimary);
`
