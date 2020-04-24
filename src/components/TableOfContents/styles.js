import styled from 'styled-components'
import Tag from '../../jh-ui/Tag'
import Card from '../../jh-ui/Card'
import Button from '../../jh-ui/Button'
import Heading from '../../jh-ui/Heading'

export const TOCButton = styled(Tag)`
  display: inline-flex;
  align-items: center;
  border: 0;
  text-transform: none;

  .no-js & {
    display: none;
  }
`

export const TOCWrap = styled(Card)`
  width: 38rem;
  max-width: calc(100vw - 2.5rem);
  background: var(--backgroundPrimary);

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: calc(100vw - 3.5rem);
  }
`

export const TOCHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
`

export const CloseButton = styled(Button)`
  height: auto;
  margin-left: auto;
  padding: 0.3rem;
  border: 0;
  background-color: var(--backgroundTertiary);
  color: var(--text);
`

export const ItemsWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  list-style: none;
`

export const Item = styled.li`
  grid-column: 1 / -1;
  position: relative;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: auto / span 6;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto / span 4;
  }
`

export const ItemLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;

  &:hover,
  &:focus,
  &:active {
    background-color: rgba(125, 125, 125, 0.1);
  }

  &:focus {
    box-shadow: 0 0 0 0.2em var(--selection);
  }
`

export const ItemContent = styled.div`
  position: relative;
  pointer-events: none;
`

export const ItemHeading = styled(Heading)`
  &::after {
    display: block;
    width: 3rem;
    height: 3px;
    margin: 0.5rem auto 0.75rem;
    background-color: var(--border);
    content: '';
  }
`
