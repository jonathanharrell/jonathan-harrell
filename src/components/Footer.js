import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import Padded from '../jh-ui/Padded'
import ContentWrap from './ContentWrap'
import Twitter from '../img/icons/twitter.svg'
import Github from '../img/icons/github.svg'
import Codepen from '../img/icons/codepen.svg'
import LinkedIn from '../img/icons/linkedin.svg'
import Instagram from '../img/icons/instagram.svg'
import Rss from '../img/icons/rss.svg'
import Spaced from '../jh-ui/Spaced'
import ScreenReaderText from '../jh-ui/ScreenReaderText'

const FooterWrap = styled.footer`
  background-color: var(--backgroundInverse);
  color: var(--textLighter);
`

const footerContentBreakpoint = '35rem'

const FooterContentWrap = styled(ContentWrap)`
  text-align: center;

  @media (min-width: ${footerContentBreakpoint}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const Link = styled(GatsbyLink)`
  font-size: ${({ theme }) => theme.fontSizes.s.mobile};
  text-decoration: none;
  color: var(--textLighter);
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.s.tablet};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.s.desktop};
  }
`

const SocialLinksWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacing.s};
  
  @media (min-width: ${footerContentBreakpoint}) {
    flex: 1;
    margin-top: 0;
    text-align: right;
  }
`

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <FooterWrap aria-label="Site Footer">
      <Padded top="xl" bottom="3x">
        <FooterContentWrap>
          <Link to="/" aria-label="Home page" rel="home">
            &copy; 2017–{currentYear} Jonathan Harrell
          </Link>
          <SocialLinksWrap>
            <nav aria-label="Social Links">
              <Spaced left="s">
                <Link
                  as="a"
                  href="https://twitter.com/HarrellofDurham"
                  target="_blank"
                  rel="nofollow"
                >
                  <ScreenReaderText>
                    Twitter
                  </ScreenReaderText>
                  <Twitter/>
                </Link>
                <Link
                  as="a"
                  href="https://github.com/jonathanharrell/"
                  target="_blank"
                  rel="nofollow"
                >
                  <ScreenReaderText>
                    Github
                  </ScreenReaderText>
                  <Github/>
                </Link>
                <Link
                  as="a"
                  href="https://codepen.io/jonathanharrell/"
                  target="_blank"
                  rel="nofollow"
                >
                  <ScreenReaderText>
                    Codepen
                  </ScreenReaderText>
                  <Codepen/>
                </Link>
                <Link
                  as="a"
                  href="https://www.linkedin.com/in/jonathanharrell/"
                  target="_blank"
                  rel="nofollow"
                >
                  <ScreenReaderText>
                    LinkedIn
                  </ScreenReaderText>
                  <LinkedIn/>
                </Link>
                <Link
                  as="a"
                  href="https://www.instagram.com/harrellofdurham/"
                  target="_blank"
                  rel="nofollow"
                >
                  <ScreenReaderText>
                    Instagram
                  </ScreenReaderText>
                  <Instagram/>
                </Link>
                <Link
                  as="a"
                  href="https://jonathan-harrell.com/?feed=rss"
                  target="_blank"
                  rel="nofollow"
                >
                  <ScreenReaderText>
                    RSS
                  </ScreenReaderText>
                  <Rss/>
                </Link>
              </Spaced>
            </nav>
          </SocialLinksWrap>
        </FooterContentWrap>
      </Padded>
    </FooterWrap>
  )
}

export default Footer
