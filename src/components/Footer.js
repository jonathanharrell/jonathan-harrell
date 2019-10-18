import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import Padded from '../jh-ui/Padded'
import { breakpoints } from '../jh-ui/themes'
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
  background-color: ${({ theme }) => theme.colors.backgroundInverse};
  color: ${({ theme }) => theme.colors.textLighter};
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
  color: ${({ theme }) => theme.colors.textLighter};
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.s.tablet};
  }
  
  @media (min-width: ${breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.s.desktop};
  }
`

const SocialLinksWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacing.s};
  
  @media (min-width: ${footerContentBreakpoint}) {
    margin-top: 0;
  }
`

const Footer = class extends React.Component {
  render() {
    return (
      <FooterWrap>
        <Padded top="xl" bottom="3x">
          <FooterContentWrap>
            <Link to="/">
              &copy; 2017–2019 Jonathan Harrell
            </Link>
            <SocialLinksWrap>
              <Link href="https://twitter.com/HarrellofDurham">
                <ScreenReaderText>
                  Twitter
                </ScreenReaderText>
                <Twitter/>
              </Link>
              <Spaced left="s">
                <Link href="https://github.com/jonathanharrell/">
                  <ScreenReaderText>
                    Github
                  </ScreenReaderText>
                  <Github/>
                </Link>
                <Link href="https://codepen.io/jonathanharrell/">
                  <ScreenReaderText>
                    Codepen
                  </ScreenReaderText>
                  <Codepen/>
                </Link>
                <Link href="https://www.linkedin.com/in/jonathanharrell/">
                  <ScreenReaderText>
                    LinkedIn
                  </ScreenReaderText>
                  <LinkedIn/>
                </Link>
                <Link href="https://www.instagram.com/harrellofdurham/">
                  <ScreenReaderText>
                    Instagram
                  </ScreenReaderText>
                  <Instagram/>
                </Link>
                <Link href="https://jonathan-harrell.com/?feed=rss">
                  <ScreenReaderText>
                    RSS
                  </ScreenReaderText>
                  <Rss/>
                </Link>
              </Spaced>
            </SocialLinksWrap>
          </FooterContentWrap>
        </Padded>
      </FooterWrap>
    )
  }
}

export default Footer
