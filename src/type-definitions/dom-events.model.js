/**
 * @typedef {Event & { target: HTMLFormElement }} FormEvent
 */

/**
 * @typedef {InputEvent & { target: HTMLInputElement, value: *, detail: *}} FormInputEvent
 * @typedef {(e: FormInputEvent) => void} FormInputHandler
 * */

/**
 * @typedef {InputEvent & { target: HTMLInputElement, key: string, keyCode: number }} FormKeypressEvent
 * @typedef {(e: FormKeypressEvent) => void} FormKeypressHandler
 * */

/**
 * @typedef {Event & { target: HTMLElement & {id: string} }} ElementClickEvent
 */

/**
 * @typedef {{id: string, value: *, checked?: boolean}} AppInputEventValue
 * @typedef {Event & {target: AppInputEventValue}} AppInputEvent
 */
