import { css } from 'lit'

const inputGlobalStyles = css`
  input:not([type='checkbox']),
  textarea {
    display: block;
    border-radius: var(--small-border-radius);
    border: var(--small-border);
    padding: 16px;
    font-size: 16px;
    min-width: 250px;
    box-sizing: border-box;
    width: 100%;
  }
  @media only screen and (max-width: 1024px) {
  }

  @media only screen and (max-width: 768px) {
  }

  @media only screen and (max-width: 480px) {
  }
`

export default inputGlobalStyles
