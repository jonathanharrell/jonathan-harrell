import styled from 'styled-components'
import { motion } from 'framer-motion'
import ContentWrap from '../../components/ContentWrap/'
import Text from '../../jh-ui/Text'

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
  grid-gap: 0 ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

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
  padding: 50% 0;
`

export const BioImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
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
  background-color: var(--backgroundSecondary);
`

export const Involvement = styled.div`
  display: grid;
  grid-gap: 0 ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
  border-top: 1px solid var(--border);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-gap: 0 ${({ theme }) => theme.spacing['3x']};
  }
`

export const InvolvementTitle = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 4;
  }
`

export const InvolvementDescription = styled(Text)`
  grid-column: 1 / -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 6;
  }
`

export const UsesWrap = styled.section`
  background-color: var(--backgroundPrimary);
`

export const Usage = styled.div`
  display: grid;
  grid-gap: 0 ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: repeat(12, 1fr);
  border-top: 1px solid var(--border);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-gap: 0 ${({ theme }) => theme.spacing['3x']};
  }

  dt,
  dd {
    grid-column: 1 / -1;

    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
      grid-column: auto / span 6;
    }
  }

  dt p {
    font-weight: 600;

    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-weight: 400;
    }
  }
`

export const UsageLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.m.mobile};
  color: var(--text);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.m.tablet};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.m.desktop};
  }

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
  }
`
