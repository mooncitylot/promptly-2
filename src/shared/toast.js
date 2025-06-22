import AppEvents from '../app-events.js'

/**
 * @param {string} text the message the toast will display
 * @param {boolean} [warning] sets the warning styling on the toast message for urgent cases
 */
export function toast(text, warning) {
  window.dispatchEvent(
    new CustomEvent(AppEvents.TOAST, {
      bubbles: true,
      composed: true,
      detail: {
        text,
        warning,
      },
    })
  )
}
