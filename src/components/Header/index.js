import React from 'react'
import PropTypes from 'prop-types'
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

const Header = ({ location, shell }) => (
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
          {!shell && <MobileMenu location={location} />}
          <DesktopMenu location={location} shell={shell} />
        </HeaderContentWrap>
      </ContentWrap>
    </Padded>
  </HeaderWrap>
)

Header.propTypes = {
  location: PropTypes.object.isRequired,
  shell: PropTypes.bool.isRequired
}

export default Header
