import { css } from 'lit'

const formGlobalStyles = css`
  form {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 16px;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }
  /** any row items  should have the same width */
  .row > * {
    flex: 1;
  }
  textarea {
    height: 100px;
  }
`

export default formGlobalStyles
