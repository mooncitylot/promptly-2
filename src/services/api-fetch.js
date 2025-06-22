import { getUserToken } from '../session/session.js'

const DEFAULT_API = process.env.API_URL

/** @type {HttpMethods} */
export const Methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

/**
 * @param {string} path
 * @param {ApiFetchOptions} method
 * @param {Object} [body]
 * @returns {Promise<Response>}
 */
export async function apiFetch(path, method, body = null, API = DEFAULT_API) {
  /** @type {RequestInit & {headers: HeadersInit & {Authorization: string}}}} */
  const options = {
    method,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getUserToken() || ''}`,
    },
  }

  if (body) options['body'] = JSON.stringify(body)

  const res = await fetch(API + path, options)
  if (res.ok) {
    return res
  } else {
    throw /** @type {HttpError} */ {
      message: (await res.json()).message || res.statusText,
      res,
    }
  }
}
