import styled from 'styled-components'

export const Loader = styled.span`
  display: block;
  position: relative;
  width: 10em;
  height: 10em;
  margin: 55px auto;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1em;
  font-size: 11px;
  text-indent: -99999em;
  color: var(--accent);
  transform: translateZ(0) scale(0.5);

  &::before,
  &::after {
    position: absolute;
    border-radius: 50%;
    content: '';
  }

  &::before {
    top: -0.1em;
    left: -0.1em;
    width: 5.2em;
    height: 10.2em;
    border-radius: 5em 0 0 5em;
    background-color: var(--backgroundPrimary);
    transform-origin: 5.1em 5.1em;
    animation: load 2s infinite ease 1.5s;
  }

  &::after {
    width: 5.2em;
    height: 10.2em;
    border-radius: 0 5em 5em 0;
    top: -0.1em;
    left: 4.9em;
    background-color: var(--backgroundPrimary);
    transform-origin: 0.1em 5.1em;
    animation: load 2s infinite ease;
  }

  @keyframes load {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
