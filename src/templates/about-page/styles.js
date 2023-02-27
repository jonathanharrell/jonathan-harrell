import styled from 'styled-components'
import { motion } from 'framer-motion'
import Image from 'gatsby-image'
import Text from '../../jh-ui/Text'
import Card from '../../jh-ui/Card'
import ContentWrap from '../../components/ContentWrap/'

export const HeaderWrap = styled.header`
  padding-top: ${({ theme }) => theme.spacing['3x']};
  background-color: var(--backgroundPrimary);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['5x']};
  }
`

export const AboutContentWrap = styled(ContentWrap)`
  padding-top: ${({ theme }) => theme.spacing['3x']};
  padding-bottom: ${({ theme }) => theme.spacing['3x']};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
    padding-bottom: ${({ theme }) => theme.spacing['4x']};
  }
`

export const HeaderContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-gap: 0 ${({ theme }) => theme.spacing.xxl};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-gap: 0 ${({ theme }) => theme.spacing['3x']};
  }
`

export const BioFigureWrap = styled.div`
  grid-column: 1 / -1;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 4;
    margin-bottom: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 2 / span 4;
  }
`

export const BioFigure = styled(motion.figure)`
  position: relative;
`

export const BioImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  img {
    border-radius: 50%;
  }
`

export const BioImageBorder = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:first-of-type {
    transform: translate(-0.75rem, -0.75rem);
  }

  &:last-of-type {
    transform: translate(0.75rem, 0.75rem);
  }
`

export const BioText = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: 5 / -1;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 6 / -2;
  }
`

export const InvolvementWrap = styled.section`
  background-color: var(--backgroundPrimary);
`

export const ProjectsWrap = styled(motion.ul)`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl} 0;
  grid-template-columns: repeat(12, 1fr);
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-gap: ${({ theme }) => theme.spacing.xxl};
  }
`

export const ProjectWrap = styled(motion.li)`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 6;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: auto / span 4;
  }
`

export const Project = styled(Card)`
  position: relative;
  height: 100%;
  background-color: var(--backgroundElevatedSecondary);
`

export const ProjectLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const ProjectTitle = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 4;
  }
`

export const ProjectDescription = styled(Text)`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 6;
  }
`

export const UsesWrap = styled.section`
  background-color: var(--backgroundPrimary);
`

export const UsagesWrap = styled(motion.div)`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
`

export const UsageWrap = styled(motion.div)`
  grid-column: auto / span 6;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 4;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: auto / span 2;
  }
`

export const UsageExcerpt = styled(Card)`
  position: relative;
  height: 100%;
  background-color: var(--backgroundElevatedSecondary);
  text-align: center;
`

export const UsageLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const SkillsetWrap = styled.section`
  background-color: var(--backgroundPrimary);
`

export const SkillsWrap = styled(motion.ul)`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.xxl} 0;
  grid-template-columns: repeat(12, 1fr);
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-gap: ${({ theme }) => theme.spacing.xxl};
  }
`

export const SkillWrap = styled(motion.li)`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 4;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: auto / span 4;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    grid-column: auto / span 3;
  }
`

export const Skill = styled(Card)`
  height: 100%;
  background-color: var(--backgroundElevatedSecondary);
`
