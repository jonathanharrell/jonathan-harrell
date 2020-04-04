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

const Header = ({ mobileMenuExpanded, handleMobileMenuExpandedChange }) => (
  <HeaderWrap aria-label="Site Header">
    <Padded vertical="m">
      <ContentWrap>
        <HeaderContentWrap>
          <SiteTitle
            mobileMenuExpanded={mobileMenuExpanded}
            level={4}
            element="span"
          >
            <HomePageLink to="/" aria-label="Home page" rel="home">
              <Spaced right="xs">
                <Icon>{`</>`}</Icon>
              </Spaced>
              Jonathan Harrell
            </HomePageLink>
          </SiteTitle>
          <MobileMenu handleExpandedChange={handleMobileMenuExpandedChange} />
          <DesktopMenu />
        </HeaderContentWrap>
      </ContentWrap>
    </Padded>
  </HeaderWrap>
)

Header.propTypes = {
  mobileMenuExpanded: PropTypes.bool.isRequired,
  handleMobileMenuExpandedChange: PropTypes.func.isRequired
}

Header.defaultProps = {
  mobileMenuExpanded: false
}

export default Header
