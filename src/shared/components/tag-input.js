import { LitElement, html, css } from 'lit-element'

class TagInput extends LitElement {
  static formAssociated = true
  static properties = {
    _value: { type: Array },
    newTag: { type: String },
  }

  constructor() {
    super()
    this.internals = this.attachInternals()
    /** @type {string[]} */
    this._value = []
    this.newTag = ''
  }

  /** @param {string[]} tags */
  set value(tags) {
    this._value = tags || []
    this.internals.setFormValue(JSON.stringify(this._value))
  }

  get value() {
    return this._value
  }

  updateNewTag(/** @type {AppInputEvent} */ e) {
    if (e.target.value === ',' || e.target.value === ' ') e.target.value = ''

    this.newTag = e.target.value
    const lastChar = this.newTag.charAt(this.newTag.length - 1)
    if (lastChar === ',' || lastChar === ' ') {
      this.addTag()
    }
  }

  addTag() {
    if (this.newTag.length > 0 && !this.value.includes(this.newTag)) {
      this.value = [...this.value, this.newTag.replace(',', '').trim().toLowerCase()]
      this.newTag = ''
    }
  }

  handleKeyDown(/** @type {FormKeypressEvent} */ e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.addTag()
    }

    if (e.key === 'Backspace' && this.newTag === '') {
      e.preventDefault()
      const lastTag = this.value[this.value.length - 1]
      if (lastTag) {
        this.value = this.value.slice(0, -1)
        this.newTag = lastTag
      }
    }
  }

  removeTag(/** @type {string} */ tag) {
    this.value = this.value.filter((/** @type {string} */ t) => t !== tag)
  }

  render() {
    return html`
      <div>
        ${(this._value || []).map(
          (tag) => html`
            <div class="tag">
              ${tag}
              <span class="tag-remove" @click=${() => this.removeTag(tag)}>x</span>
            </div>
          `
        )}
        <input
          type="text"
          placeholder="Add tags..."
          .value=${this.newTag}
          @input=${this.updateNewTag}
          @keydown=${this.handleKeyDown}
        />
      </div>
    `
  }
  static styles = css`
    :host {
      display: block;
    }

    .tag {
      display: inline-block;
      background-color: #eee;
      color: #333;
      border-radius: 3px;
      padding: 3px 6px;
      margin: 4px;
    }

    .tag-remove {
      margin-left: 4px;
      color: #999;
      cursor: pointer;
    }

    input[type='text'] {
      font-size: 16px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 3px;
      margin-right: 8px;
    }
  `
}

customElements.define('tag-input', TagInput)
