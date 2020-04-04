import React from 'react'
import Padded from '../../jh-ui/Padded'
import Spaced from '../../jh-ui/Spaced'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import { FooterContentWrap, FooterWrap, Link, SocialLinksWrap } from './styles'
import Twitter from '../../svgs/icons/twitter.svg'
import Github from '../../svgs/icons/github.svg'
import Codepen from '../../svgs/icons/codepen.svg'
import LinkedIn from '../../svgs/icons/linkedin.svg'
import Instagram from '../../svgs/icons/instagram.svg'
import Rss from '../../svgs/icons/rss.svg'

const currentYear = new Date().getFullYear()

const Footer = () => (
  <FooterWrap aria-label="Site Footer">
    <Padded top="xl" bottom="3x">
      <FooterContentWrap>
        <ScreenReaderText element="h2">Site Footer</ScreenReaderText>
        <Link to="/" aria-label="Home page" rel="home">
          &copy; 2017–{currentYear} Jonathan Harrell
        </Link>
        <SocialLinksWrap aria-labelledby="social-links-label">
          <ScreenReaderText>
            <h3 id="social-links-label">Social Links</h3>
          </ScreenReaderText>
          <nav>
            <Spaced left="s">
              <Link
                as="a"
                href="https://twitter.com/HarrellofDurham"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ScreenReaderText>Twitter</ScreenReaderText>
                <Twitter />
              </Link>
              <Link
                as="a"
                href="https://github.com/jonathanharrell/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ScreenReaderText>Github</ScreenReaderText>
                <Github />
              </Link>
              <Link
                as="a"
                href="https://codepen.io/jonathanharrell/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ScreenReaderText>Codepen</ScreenReaderText>
                <Codepen />
              </Link>
              <Link
                as="a"
                href="https://www.linkedin.com/in/jonathanharrell/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ScreenReaderText>LinkedIn</ScreenReaderText>
                <LinkedIn />
              </Link>
              <Link
                as="a"
                href="https://www.instagram.com/harrellofdurham/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ScreenReaderText>Instagram</ScreenReaderText>
                <Instagram />
              </Link>
              <Link
                as="a"
                href="https://jonathan-harrell.com/?feed=rss"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ScreenReaderText>RSS</ScreenReaderText>
                <Rss />
              </Link>
            </Spaced>
          </nav>
        </SocialLinksWrap>
      </FooterContentWrap>
    </Padded>
  </FooterWrap>
)

export default Footer
