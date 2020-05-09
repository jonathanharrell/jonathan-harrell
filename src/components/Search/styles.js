import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { motion } from 'framer-motion'
import Input from '../../jh-ui/Input'

export const SearchInput = styled(Input)`
  width: 100%;
`

export const StateResultsWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex: 1 0 auto;
`

export const LoaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  svg {
    height: 8rem;
  }
`

export const HitsList = styled(motion.ul)`
  list-style: none;
`

export const Hit = styled(motion.li)`
  border-top: 1px solid var(--border);
`

export const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
`

export const Link = styled(GatsbyLink)`
  color: var(--text);
  text-decoration-color: transparent;
  transition: text-decoration-color 0.2s ${({ theme }) => theme.beziers.out};

  &:hover,
  &:focus,
  &:active {
    text-decoration-color: var(--text);
  }
`
