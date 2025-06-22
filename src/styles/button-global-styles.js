import { css } from 'lit'

const buttonGlobalStyles = css`
  :host {
    --button-background-color: var(--app-primary-color, white);
    --button-font-color: var(--app-primary-font-color, black);
    --button-border-radius: var(--app-border-radius, 4px);
    --button-border: 1px solid var(--app-primary-color, white);
    --button-padding: 16px 32px;
    --button-margin: 16px 0px;
    --button-font-weight: 500;
    --button-padding: 16px 32px;
    --button-font-size: 16px;

    --secondary-button-background-color: var(--app-secondary-color, white);
    --secondary-button-font-color: var(--app-secondary-font-color, black);

    --button-sm-padding: 8px 16px;
    --button-lg-padding: 20px 40px;
  }
  button {
    margin: var(--button-margin) 0px;
    font-weight: var(--button-font-weight);
    border: var(--button-border);
    border-radius: var(--button-border-radius);
    padding: var(--button-padding);
    background-color: var(--button-background-color);
    font-size: var(--button-font-size);
    color: var(--button-font-color);
    cursor: pointer;
  }
  button.outline {
    background-color: transparent;
    border: 1px solid var(--app-primary-color);
    color: var(--app-primary-color);
  }
  button.sm {
    padding: var(--button-sm-padding);
  }
  button.lg {
    padding: var(--button-lg-padding);
  }
  button:not([disabled]):hover {
    opacity: 0.7;
  }
  button:active {
    opacity: 0.8;
  }
  button[disabled] {
    opacity: 0.4;
    cursor: default;
  }
  /** Secondary button styling */
  button.secondary {
    color: var(--secondary-button-font-color);
    background-color: var(--secondary-button-background-color);
    border: 1px solid var(--secondary-button-background-color);
  }
  button.secondary.outline {
    color: var(--app-secondary-color);
    background-color: transparent;
    border: 1px solid var(--app-secondary-color);
  }
  button.secondary:not([disabled]):hover {
    border: 1px solid white;
  }
  button[warning] {
    border-color: red;
    color: red;
  }
  button[warning]:hover {
    border-color: red;
    color: white;
    background-color: red;
  }
  button.wide {
    width: 100%;
  }
  button.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  /** Link that looks like a button */
  a.button {
    display: block;
    border: var(--button-border);
    border-radius: var(--button-border-radius);
    padding: 16px 0px;
    text-align: center;
    width: 100%;
  }
  .iconButton {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  @media only screen and (max-width: 1024px) {
    .btn {
    }
  }

  @media only screen and (max-width: 768px) {
    .btn {
    }
  }

  @media only screen and (max-width: 480px) {
    button {
      display: block;
      width: 100%;
    }
  }
`

export default buttonGlobalStyles
