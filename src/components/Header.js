import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import ContentWrap from './ContentWrap'
import Padded from '../jh-ui/Padded'
import Heading from '../jh-ui/Heading'
import MobileMenu from './MobileMenu'

const HeaderWrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: var(--backgroundPrimary);
`

const HeaderContentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SiteTitle = styled(Heading)`
  position: relative;
  z-index: 1;
  font-size: 1.25rem;
`

const HomePageLink = styled(Link)`
  text-decoration: none;
  color: var(--text);
`

class Header extends React.Component {
  render() {
    return (
      <HeaderWrap aria-label="Site Header">
        <Padded vertical="m">
          <ContentWrap>
            <HeaderContentWrap>
              <SiteTitle level={4} element="span">
                <HomePageLink to="/" aria-label="Home page" rel="home">
                  Jonathan Harrell
                </HomePageLink>
              </SiteTitle>
              <MobileMenu/>
            </HeaderContentWrap>
          </ContentWrap>
        </Padded>
      </HeaderWrap>
    )
  }
}

export default Header
