import { LitElement, html } from 'lit-element'

class SandboxElement extends LitElement {
  render() {
    return html` <h1>Sandbox</h1> `
  }
}

customElements.define('sandbox-container', SandboxElement)
