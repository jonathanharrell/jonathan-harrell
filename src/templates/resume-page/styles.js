import styled from 'styled-components'
import { motion } from 'framer-motion'
import Ul from '../../jh-ui/Ul'

export const ResumeIndexWrap = styled.div`
  flex: 1;
  background-color: var(--backgroundPrimary);
`

export const Header = styled.header`
  padding-top: ${({ theme }) => theme.spacing['3x']};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['5x']};
  }
`

export const ResumeContentWrap = styled.div`
  display: grid;
  grid-gap: 0 ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
`

export const HistoryWrap = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 1 / span 7;
  }
`

export const AdditionalInfoWrap = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 9 / -1;
  }
`

export const HistoryList = styled(motion.ul)`
  list-style: none;
`

export const Job = styled(motion.li)`
  &:not(:first-of-type) {
    border-top: 1px solid var(--border);
  }
`

export const JobDescription = styled.div`
  p {
    margin-bottom: 0 !important;
  }

  ul,
  ul li:last-child {
    margin-bottom: 0 !important;
  }

  ul {
    @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
      margin-left: 0 !important;
    }
  }
`

export const EducationWrap = styled.section`
  border-top: 1px solid var(--border);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border: 0;
  }
`

export const EducationDescription = styled.div`
  p {
    margin-bottom: 0 !important;
  }
`

export const SkillsetWrap = styled.section`
  border-top: 1px solid var(--border);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border: 0;
  }
`

export const SkillsList = styled(Ul)`
  list-style: none;
  margin: 0;

  li {
    display: inline;

    &:not(:last-child) span::after {
      content: ', ';
    }
  }
`

export const ToolsWrap = styled.section`
  border-top: 1px solid var(--border);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border: 0;
  }
`

export const ToolsList = styled(Ul)`
  list-style: none;
  margin: 0;

  li {
    margin-bottom: 0;
  }
`

export const OpenSourceWrap = styled.section`
  border-top: 1px solid var(--border);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border: 0;
  }
`

export const ProjectsList = styled(Ul)`
  list-style: none;
  margin: 0;

  li {
    margin-bottom: 0;
  }
`

export const ProjectLink = styled.a`
  color: var(--text);

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
  }
`
