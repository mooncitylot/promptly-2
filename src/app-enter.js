import 'element-internals-polyfill'
import { LitElement, html, css } from 'lit'
import routerMixin from './router/router-mixin.js'

import './styles/fonts/Lato-Bold.ttf'
import './styles/fonts/Lato-Regular.ttf'

import { routes } from './router/routes.js'
import { go } from './router/router-mixin.js'
import globalStyles from './styles/global-styles.js'
import { clearSession, getSessionExpiration, getSessionUser, sessionUserIsAdmin } from './session/session.js'
import Globals from './Globals.js'
import AppEvents from './app-events.js'

window.Globals = new Globals()

class AppEnterElement extends routerMixin(LitElement) {
  /** @param {Event} e */
  handleBackClick(e) {
    e.preventDefault()

    if (this.backArrowOverride) return go(this.backArrowOverride.path, this.backArrowOverride.params)
    if (this.backArrowLocation) return go(this.backArrowLocation)

    window.history.back()
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener(
      AppEvents.SET_BACK_ARROW,
      (/** @type {Event & {detail: {path: string, params: Object}}} */ e) => (this.backArrowOverride = e.detail)
    )

    this.startSessionInterval()
    this.handleUpdate()
  }

  handleUpdate() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistration()
        .then((registration) => {
          if (registration) {
            registration.update()
          } else {
            console.error('Service worker registration not found.')
          }
        })
        .catch((error) => {
          console.error(`Error checking for service worker registration: ${error}`)
        })
    }
  }

  startSessionInterval() {
    setInterval(() => {
      const sessionExpiration = getSessionExpiration()
      if (!sessionExpiration) return

      const remaining = new Date(getSessionExpiration()).getTime() - new Date().getTime()

      if (remaining <= 0) {
        clearSession()
        this.warningShown = false
        alert('Your session has expired, please login again')
        go(routes.LOGIN.path)
      }
    }, 15000)
  }

  handleLogoClick() {
    if (window.location.pathname.includes(routes.MAP.path)) {
      go(routes.MAP.path)
    }
  }

  render() {
    const homeRoute = routes.SANDBOX.path
    this.handleUpdate()

    // TODO: add alt text to images

    return html`
      ${this.showHeader
        ? html`
            <header>
              <h1>header</h1>
            </header>
          `
        : null}
      <slot ?header=${this.showHeader}></slot>
    `
  }

  static styles = [
    globalStyles,
    css`
      :host {
        padding: 0px;
        background-color: gray;
      }
      slot {
        position: fixed;
        height: 90%;
        overflow-y: scroll;
      }
      slot[header] {
        width: 100%;
        display: block;
        margin-top: var(--app-header-height);
      }
      header {
        display: flex;
        position: fixed;
        top: 0px;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background-color: var(--app-primary-color);
      }
      header h1 {
        margin-left: 16px;
        color: white;
      }
      .header-icons {
        height: calc(var(--app-header-height) * 0.7);
        z-index: 7000;
        display: flex;
        align-items: center;
      }
      .home {
        right: 15px;
      }
      a {
        cursor: pointer;
      }
      a > svg {
        width: 25px;
        height: 25px;
      }
      .logoResize {
        display: flex;
        height: 60px;
        padding: 5px;
      }
      .circleResize {
        display: flex;
        align: center;
        height: 60px;
        padding: 5px;
      }
      .loginButton {
        display: flex;
        background-color: transparent;
        border-color: white;
        margin: 0px;
        /* TODO: figure out why this is needed on ios for header login */
        transform: translate(-10px, 0px);
      }
      .navIcon {
        display: flex;
        color: white;
        padding: 25px;
      }
    `,
  ]
}

customElements.define('app-enter', AppEnterElement)
export default AppEnterElement
