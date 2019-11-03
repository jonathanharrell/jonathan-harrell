import React from 'react'
import styled from 'styled-components'

const StyledPre = styled.pre`
  overflow-x: auto;
  background-color: var(--backgroundCode);
  white-space: pre-wrap;
  
  code {
    line-height: 1.6;
    color: var(--textInverse);
  }
  
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: hsl(219, 10%, 40%);
  }
  
  .token.punctuation {
    color: hsl(219, 14%, 71%);
  }
  
  .token.selector,
  .token.tag {
    color: hsl(355, 65%, 65%);
  }
  
  .token.property,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.attr-name,
  .token.deleted {
    color: hsl(29, 54%, 61%);
  }
  
  .token.string,
  .token.char,
  .token.attr-value,
  .token.builtin,
  .token.inserted {
    color: hsl(95, 38%, 62%);
  }
  
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    background-color: transparent;
    color: hsl(187, 47%, 55%);
  }
  
  .token.atrule,
  .token.keyword {
    color: hsl(286, 60%, 67%);
  }
  
  .token.function {
    color: hsl(207, 82%, 66%);
  }
  
  .token.regex,
  .token.important,
  .token.variable {
    color: hsl(286, 60%, 67%);
  }
  
  .token.important,
  .token.bold {
    font-weight: var(--hiq-font-weight-bold);
  }
  
  .token.italic {
    font-style: italic;
  }
  
  .token.entity {
    cursor: help;
  }
  
  .token.attr-name {
    font-style: italic;
  }
`

const Pre = ({ children, ...props }) => (
  <StyledPre {...props}>
    {children}
  </StyledPre>
)

export default Pre
