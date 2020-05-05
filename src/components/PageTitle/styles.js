import styled from 'styled-components'

export const Wrap = styled.div`
  position: relative;
  display: inline-block;
`

export const NavLink = styled.a`
  clip: rect(0 0 0 0);
  display: inline-block;
  position: absolute;
  left: 0;
  top: 50%;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  background-color: var(--buttonBackgroundSecondary);
  color: var(--buttonTextSecondary);
  transform: translate(calc(-100% - 1rem), -50%);

  &:focus.focus-visible {
    clip: unset;
    width: auto;
    height: auto;
    box-shadow: 0 0 0 2px var(--selection);
    opacity: 1;
  }
`
