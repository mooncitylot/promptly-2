import { LitElement, html, css } from 'lit'

export const DialogEvents = {
  CLOSE: 'dialog-close-button-click',
}

export default class AppDialog extends LitElement {
  static properties = {
    title: { type: String },
    large: { type: Boolean },
    closeButton: { type: Boolean },
    logoHeader: { type: Boolean },
  }

  constructor() {
    super()

    this.title = ''
    this.large = false
    this.closeButton = true
    this.logoHeader = false
  }

  connectedCallback() {
    super.connectedCallback()
    window.document.body.style.overflow = 'hidden'
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.document.body.style.overflow = 'auto'
  }

  close() {
    this.dispatchEvent(
      new CustomEvent(DialogEvents.CLOSE, {
        bubbles: true,
        composed: true,
        detail: {},
      })
    )
  }

  render() {
    return html`
      <div class="wrapper">
        <div class=${this.large ? 'content large' : 'content'}>
          <header>
            ${this.logoHeader
              ? html` <header>
                  <img class="red" src="/images/background.png" alt="Logo" />
                  <img class="logo" src="/images/logo.png" alt="Logo" />
                </header>`
              : null}
            ${this.title ? html` <h2>${this.title}</h2> ` : html` <slot name="header"> </slot> `}
            ${this.closeButton ? this.renderCloseButton() : ''}
          </header>
          <div class="dialog-body">
            <slot name="body"> </slot>
          </div>
        </div>
      </div>
      <div class="dialog-bg" @click=${this.close}></div>
    `
  }

  renderCloseButton() {
    return html` <button class="close-button" @click=${this.close}>x</button> `
  }

  static styles = css`
    :host {
      --header-height: 6rem;
    }
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    .wrapper {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9900;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .content {
      background: white;
      width: var(--app-dialog-card-width, calc(100% - 1rem));
      max-height: calc(100% - 1rem);
      max-width: 36rem;
      border-radius: var(--app-border-radius);
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: auto;
      color: var(--primary);
      z-index: 5500;
      position: relative;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
    .dialog-body {
      padding: var(--app-dialog-article-padding, 1rem);
    }
    header {
      padding: var(--app-dialog-header-padding, 1rem);
      display: flex;
      justify-content: var(--app-dialog-header-justify-content, space-between);
      border-bottom: var(--app-dialog-header-border, 1px solid var(--dusk-light));
    }
    .red {
      position: relative;
      top: 0;
      left: 0;
      height: var(--header-height);
      width: 900px;
    }
    .logo {
      position: absolute;
      top: 10px;
      left: 10px;
      height: calc(var(--header-height) * 0.7);
    }
    .close-button {
      background: unset;
      border: none;
      padding: 0;
      cursor: pointer;
      border-radius: var(--border-radius-sharp);
      color: var(--icon-fill);
    }
    header h2 {
      font-family: var(--app-dialog-title-font-family, var(--headline-font));
      margin: 0;
      font-size: var(--app-dialog-header-font-size, 1rem);
      line-height: 1em;
    }
    .close-button:hover {
      background-color: var(--dusk-light);
    }
    .dialog-bg {
      position: fixed;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      background-color: black;
      opacity: 0.6;
      z-index: 5000;
    }

    @media only screen and (min-width: 640px) {
      .dialog-body {
        padding: var(--app-dialog-article-padding-640, 2rem);
      }
      header {
        padding: var(--app-dialog-header-padding-640, 1.5rem 2rem);
      }
      .content {
        height: auto;
      }
      header h2 {
        font-size: var(--app-dialog-header-font-size-640, 1.2rem);
      }
      .content.large {
        max-width: 100%;
        width: calc(100% - 3rem);
        max-width: 1280px;
        max-height: calc(100% - 3rem);
      }
      
    @media only screen and (min-width: 768px) {
      .content.large {
        width: calc(100% - 4rem);
        max-height: calc(100% - 4rem);
      }
    }
    @media only screen and (min-width: 1024px) {
      .content.large {
        width: 90vw;
        max-height: calc(100% - 4rem);
      }
    }
  `
}

customElements.define('app-dialog', AppDialog)
