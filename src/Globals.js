// @ts-nocheck
import AppEvents from './app-events.js'
const SESSION_GLOBALS = 'app-session-globals'

export function storeSessionGlobals(globals) {
  window.sessionStorage.setItem(SESSION_GLOBALS, JSON.stringify(globals))
}

export function getSessionGlobals() {
  const stored = window.sessionStorage.getItem(SESSION_GLOBALS)
  return stored && JSON.parse(stored)
}

export default class Globals {
  #state = {
    // TODO: add your globals here
  }

  constructor(init = getSessionGlobals()) {
    this.update({
      ...init,
    })
  }

  update(globals) {
    // TODO: add your globals here

    storeSessionGlobals(this.#state)
    this.dispatchUpdate()
  }

  dispatchUpdate() {
    window.dispatchEvent(
      new CustomEvent(AppEvents.GLOBALS_UPDATED, {
        detail: this.#state,
      })
    )
  }

  /**
   * @function onUpdate
   * @description Adds an event listener for global updates
   * @param {(e: CustomEvent) => void} callback - The function to be called on update event
   * @returns {Function} - Cleanup function to remove the event listener when called
   */
  onUpdate(callback) {
    window.addEventListener(AppEvents.GLOBALS_UPDATED, callback)

    return () => window.removeEventListener(AppEvents.GLOBALS_UPDATED, callback)
  }
}
