import styled from 'styled-components'
import ContentWrap from '../../components/ContentWrap/'

export const HeaderWrap = styled.header`
  position: relative;
  overflow: hidden;
  padding-top: 5rem;
  background-color: var(--backgroundPrimary);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: 7rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: 10rem;
  }
`

export const HomeContentWrap = styled(ContentWrap)`
  position: relative;
  padding-top: ${({ theme }) => theme.spacing['3x']};
  padding-bottom: ${({ theme }) => theme.spacing['3x']};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
    padding-bottom: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['5x']};
    padding-bottom: ${({ theme }) => theme.spacing['5x']};
  }
`

export const Canvas = styled.canvas`
  position: absolute;
  top: calc(50% - 2rem);
  right: -50%;
  width: 100vw;
  height: 100vw;
  transform: translateY(-50%);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    left: auto;
    right: 50px;
    width: 70vw;
    height: 70vw;
    transform: translate(0, -50%);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    right: -15vh;
  }
`

export const HeaderContentWrap = styled.div`
  position: relative;
  max-width: 28rem;
`

export const RecentArticlesWrap = styled.section`
  background-color: var(--backgroundSecondary);
`

export const ExperimentsWrap = styled.section`
  background-color: var(--backgroundInverse);
`
