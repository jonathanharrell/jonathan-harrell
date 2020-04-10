import React from 'react'
import Padded from '../../jh-ui/Padded'
import Spaced from '../../jh-ui/Spaced'
import ContentWrap from '../ContentWrap'
import MobileMenu from '../MobileMenu/'
import DesktopMenu from '../DesktopMenu'
import {
  HeaderContentWrap,
  HeaderWrap,
  HomePageLink,
  Icon,
  SiteTitle
} from './styles'

const Header = () => (
  <HeaderWrap aria-label="Site Header">
    <Padded vertical="m">
      <ContentWrap>
        <HeaderContentWrap>
          <SiteTitle level={4} element="span">
            <HomePageLink to="/" aria-label="Home page" rel="home">
              <Spaced right="xs">
                <Icon>{`</>`}</Icon>
              </Spaced>
              Jonathan Harrell
            </HomePageLink>
          </SiteTitle>
          <MobileMenu />
          <DesktopMenu />
        </HeaderContentWrap>
      </ContentWrap>
    </Padded>
  </HeaderWrap>
)

export default Header
