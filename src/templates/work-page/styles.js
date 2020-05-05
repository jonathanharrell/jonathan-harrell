import styled from 'styled-components'
import { motion } from 'framer-motion'

export const WorkIndexWrap = styled.div`
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

export const Project = styled(motion.article)`
  background-color: ${({ odd }) =>
    odd ? 'var(--backgroundSecondary)' : 'transparent'};
`

export const ProjectContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing['4x']} 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => theme.spacing['5x']} 0;
  }
`

export const ProjectImageWrap = styled.div`
  grid-column: 1 / -1;
  box-shadow: ${({ theme, shadow }) =>
    shadow ? theme.elevations.high : 'unset'};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 2 / -2;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: ${({ reverse }) => (reverse ? '1 / span 6' : '7 / -1')};
    grid-row: 1 / 2;
    margin-bottom: 0 !important;
  }
`

export const ProjectText = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 2 / -2;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: ${({ reverse }) => (reverse ? '8 / -1' : '1 / span 5')};
    grid-row: 1 / 2;
  }
`
