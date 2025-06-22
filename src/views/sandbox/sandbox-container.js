import { LitElement, html } from 'lit-element'
import { getAllPrompts } from '../../services/prompts.js'

class SandboxElement extends LitElement {
  static properties = {
    prompts: { type: Array },
  }

  constructor() {
    super()
    /** @type {any[]} */
    this.prompts = []
  }

  async connectedCallback() {
    super.connectedCallback()
    this.prompts = await getAllPrompts()
    console.log('PROMPTS', this.prompts)
  }

  async disconnectedCallback() {
    super.disconnectedCallback()
  }

  render() {
    return html`
      <h1>Sandbox</h1>
      <ul>
        ${this.prompts.map((prompt) => html` <li>${prompt.title}</li> `)}
      </ul>
    `
  }
}

customElements.define('sandbox-container', SandboxElement)
