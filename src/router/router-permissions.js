import { toast } from '../shared/toast.js'
import routes from './routes.js'

/** @type {PermissionCheck} */
export function userIsLoggedIn(options) {
  const isLoggedIn = !!options.sessionUser?.email

  if (!isLoggedIn) {
    toast('Please log in to view this page.')
    return routes.LOGIN
  }

  return null
}

/** @type {PermissionCheck} */
export function userIsAdmin(options) {
  // TODO: get user permissions for admin from login data
  return true ? null : routes.LOGIN
}
