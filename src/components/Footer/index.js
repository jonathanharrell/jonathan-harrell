import React from 'react'
import {
  Codepen,
  GitHub,
  Instagram,
  Linkedin,
  Rss,
  Twitter
} from 'react-feather'
import Padded from '../../jh-ui/Padded'
import Spaced from '../../jh-ui/Spaced'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import { FooterContentWrap, FooterWrap, Link, SocialLinksWrap } from './styles'

const currentYear = new Date().getFullYear()

const Footer = () => (
  <FooterWrap aria-labelledby="footer-label">
    <Padded vertical="3x">
      <FooterContentWrap>
        <ScreenReaderText element="h2" id="footer-label">
          Site Footer
        </ScreenReaderText>
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
                rel="noopener noreferrer me"
                title="Twitter"
              >
                <ScreenReaderText>twitter.com/HarrellofDurham</ScreenReaderText>
                <Twitter />
              </Link>
              <Link
                as="a"
                href="https://github.com/jonathanharrell/"
                target="_blank"
                rel="noopener noreferrer me"
                title="Github"
              >
                <ScreenReaderText>github.com/jonathanharrell/</ScreenReaderText>
                <GitHub />
              </Link>
              <Link
                as="a"
                href="https://codepen.io/jonathanharrell/"
                target="_blank"
                rel="noopener noreferrer"
                title="Codepen"
              >
                <ScreenReaderText>Codepen</ScreenReaderText>
                <Codepen />
              </Link>
              <Link
                as="a"
                href="https://www.linkedin.com/in/jonathanharrell/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <ScreenReaderText>LinkedIn</ScreenReaderText>
                <Linkedin />
              </Link>
              <Link
                as="a"
                href="https://www.instagram.com/harrellofdurham/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <ScreenReaderText>Instagram</ScreenReaderText>
                <Instagram />
              </Link>
              <Link as="a" href="/rss.xml" title="RSS Feed">
                <ScreenReaderText>RSS Feed</ScreenReaderText>
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
