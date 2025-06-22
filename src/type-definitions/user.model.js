/**
 * @typedef User
 * @property {string}                     userId
 * @property {'Client'|'Administrator'}   kind
 * @property {string}                     firstName
 * @property {string}                     lastName
 * @property {string}                     email
 * @property {string}                     phone
 * @property {boolean}                    approved
 * @property {string}                     address
 * @property {string}                     address2
 * @property {string}                     city
 * @property {string}                     state
 * @property {string}                     zip
 */

/**
 * @typedef SessionUser
 * @property {string}                                 userId
 * @property {'Client'|'Administrator'|'Superuser'}   kind
 * @property {string}                                 email
 */

/**
 * @typedef UserSignup
 * @property {string}                     firstName
 * @property {string}                     lastName
 * @property {string}                     email
 * @property {string}                     phone
 * @property {string}                     password
 */
