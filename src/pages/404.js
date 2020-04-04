import React from 'react'
import styled from 'styled-components'
import Heading from '../jh-ui/Heading'
import Spaced from '../jh-ui/Spaced'
import Text from '../jh-ui/Text'
import Layout from '../components/Layout'
import ContentWrap from '../components/ContentWrap'
import NotFound from '../svgs/not-found.svg'
import { motion } from 'framer-motion'

const HeaderWrap = styled.header`
  flex: 1;
  padding-top: ${({ theme }) => theme.spacing['3x']};
  background-color: var(--backgroundPrimary);
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['5x']};
  }
`

const NotFoundContentWrap = styled(ContentWrap)`
  padding-top: ${({ theme }) => theme.spacing['3x']};
  padding-bottom: ${({ theme }) => theme.spacing['3x']};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.spacing['4x']};
    padding-bottom: ${({ theme }) => theme.spacing['4x']};
  }
`

const NotFoundPage = () => (
  <Layout>
    <HeaderWrap aria-labelledby="about-label">
      <NotFoundContentWrap>
        <Spaced bottom="3x">
          <motion.div
            initial={
              typeof window !== 'undefined'
                ? { opacity: 0, scale: 0.75 }
                : false
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
          >
            <NotFound />
          </motion.div>
        </Spaced>
        <motion.div
          initial={
            typeof window !== 'undefined' ? { opacity: 0, y: 50 } : false
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
        >
          <Heading level={1} id="about-label">
            Oops! That page can’t be found.
          </Heading>
        </motion.div>
        <motion.div
          initial={
            typeof window !== 'undefined' ? { opacity: 0, y: 50 } : false
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 50, mass: 0.1, delay: 0.1 }}
        >
          <Spaced top="m">
            <Text>It looks like nothing was found at this location.</Text>
          </Spaced>
        </motion.div>
      </NotFoundContentWrap>
    </HeaderWrap>
  </Layout>
)

export default NotFoundPage
