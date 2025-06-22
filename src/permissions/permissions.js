import { getSessionUser } from '../session/session.js'

/** @type {PermissionTypes} */
const permissionTypes = {
  SUPERUSER: 'Superuser',
  ADMIN: 'Administrator',
  CLIENT: 'Client',
}

/** @param {SessionUser} user */
export function isLoggedin(user = getSessionUser()) {
  return !!user
}

/** @param {SessionUser} user */
export function isClient(user = getSessionUser()) {
  return user.kind === permissionTypes.CLIENT
}

/** @param {SessionUser} user */
export function isAdmin(user = getSessionUser()) {
  return user.kind === permissionTypes.ADMIN
}

/** @param {SessionUser} user */
export function isSuperuser(user = getSessionUser()) {
  return user.kind === permissionTypes.SUPERUSER
}

export default permissionTypes
