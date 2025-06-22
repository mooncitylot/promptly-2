import { apiFetch } from './api-fetch.js'

/** @param {UserSignup} user */
export function signupUser(user) {
  return apiFetch(`/v1/users/signup`, 'POST', user).then((r) => r.json())
}

/**
 * @description requires superuser permissions
 * */
export function getAllUsers() {
  // TODO: This is the actual endpoint, wire it up when it's ready
  return apiFetch(`/v1/users`, 'GET').then((r) => r.json())
}

/**
 * @param {{email: string, password: string}} login
 * @returns {Promise<LoginResponse>}
 * */
export function loginUser({ email, password }) {
  return apiFetch(`/v1/authentication/token`, 'POST', {
    email,
    password,
  }).then((r) => r.json())
}

/**
 * @param {string} userId
 * @returns
 */
export function getUserById(userId) {
  return apiFetch(`/v1/user?userid=${userId}`, 'GET').then((r) => r.json())
}

/**
 * @param {string} userId
 * @returns {Promise<User>}
 * */
export function getUser(userId) {
  return apiFetch(`/v1/user?userid=${userId}`, 'GET').then((r) => r.json())
}

/**
 * @param {User} user
 * @returns {Promise<Response>}
 */

export function updateUser(user) {
  return apiFetch('/v1/users/admin/user', 'PUT', user)
}

/** @param {string} userId */
export function deleteUser(userId) {
  return apiFetch(`/v1/user/delete?userid=${userId}`, 'DELETE')
}

// approve user /v1/users/admin/approve
/** @param {string} userId */
export function approveUser(userId) {
  return apiFetch(`/v1/users/admin/approve?userid=${userId}`, 'POST')
}

// set admin /v1/users/admin/setadmin
/** @param {string} userId */
export function setAdmin(userId) {
  return apiFetch(`/v1/users/admin/make-admin?userid=${userId}`, 'POST')
}

/**
 * @param {{email: string }} resetArgs
 **/

export function resetPassword({ email }) {
  return apiFetch(`/v1/users/password-reset`, 'POST', {
    email,
  })
}

/** @param {{email: User['email'], password: string, token: string}} email */
export function newPassword({ email, password, token: emailToken }) {
  return apiFetch(`/v1/users/new-password`, 'PUT', { email, password, emailToken })
}
