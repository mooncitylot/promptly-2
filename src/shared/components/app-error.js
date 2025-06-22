import { LitElement, html, css } from 'lit'
class AppErrorElement extends LitElement {
  static styles = css`
    slot {
      font-size: var(--app-error-font-size, 16px);
      color: var(--app-error-font-color, red);
    }
  `

  render() {
    return html`<slot></slot>`
  }
}

customElements.define('app-error', AppErrorElement)
export default AppErrorElement
