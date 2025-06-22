import { css } from 'lit'
import buttonGlobalStyles from './button-global-styles.js'
import inputGlobalStyles from './input-global-styles.js'
import formGlobalStyles from './form-global-styles.js'
import cardGlobalStyles from './card-global-styles.js'

const globalStyles = css`
  ${buttonGlobalStyles}
  ${formGlobalStyles}
  ${inputGlobalStyles}
  ${cardGlobalStyles}
  .title {
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
  }
  .label-primary {
    font-family: 'Roboto';
    font-weight: 400;
    font-weight: 500;
    font-size: 20px;
  }
  .label-secondary {
    font-family: 'Roboto';
    font-weight: 400;
    font-weight: 500;
    font-size: 16px;
  }
  .body-text {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
  }
`

export default globalStyles
