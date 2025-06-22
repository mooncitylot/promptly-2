import { LitElement } from 'lit'

import { routes } from './routes.js'
import AppEvents from '../app-events.js'
import { appendParamsObjToPath, decodeQuerystringValues, getRouteByPath } from './router-util.js'
import { getSessionUser } from '../session/session.js'

/**
 * @param {string} path
 * @param {Object<string, *>} params
 * */
export function go(path, params = null) {
  if (getRouteByPath(path, routes)) {
    window.history.pushState(null, null, params ? appendParamsObjToPath(path, params) : path)
    window.dispatchEvent(new CustomEvent(AppEvents.ROUTE_CHANGE))
  }
}

/**
 * @param {Route} routeObj
 * @returns {Route | null}
 * */
function checkRoutePermissions(routeObj) {
  /** @type {PermissionParams} */
  const options = {
    sessionUser: getSessionUser(),
  }

  let redirect = null

  // @ts-ignore
  routeObj.permissions.forEach((p) => {
    redirect = p(options)
    if (redirect) return
  })

  return redirect
}

const componentLoader = (/** @type {string} */ pathname) => import(`./../views/${pathname}.js`)

/**
 * @param {typeof LitElement} SuperClass
 */
export default (SuperClass) => {
  return class extends SuperClass {
    static properties = {
      showNav: { type: Boolean },
      showHeader: { type: Boolean },
      showBackArrow: { type: Boolean },
      backArrowLocation: { type: String },
      backArrowOverride: { type: String },
      showHeaderQuickNav: { type: Boolean },
      history: { type: Array },
    }
    constructor() {
      super()
      // Handle direct url routing (including initial page load)
      window.addEventListener('load', () => this.urlChange(), false)
      // Handle back and forward button events
      window.addEventListener('popstate', () => this.urlChange(), false)

      /** @type {*} */
      this.history = []
    }

    connectedCallback() {
      super.connectedCallback()

      window.addEventListener(AppEvents.ROUTE_CHANGE, () => this.urlChange(), false)
    }

    async urlChange() {
      if (this.backArrowOverride) this.backArrowOverride = null
      const { pathname, search } = window.location
      if (pathname === '/') return go(routes.LOGIN.path)

      const routeObj = getRouteByPath(pathname, routes)
      const redirectRoute = checkRoutePermissions(routeObj)
      if (!routeObj || redirectRoute) return go(redirectRoute.path)

      this.showNav = routeObj?.showNav && !!getSessionUser()?.userId
      this.showHeader = routeObj?.showHeader == true
      this.showBackArrow = routeObj?.showBackArrow == true
      this.showHeaderQuickNav = routeObj?.showHeaderQuickNav
      this.backArrowLocation = routeObj?.backArrowLocation

      await componentLoader(routeObj.componentPath).catch((err) => {
        console.error(err)
      })

      const context = { params: decodeQuerystringValues(search) }
      this.history = [...this.history, { ...routeObj, context }]
      this.history.length > 10 && (this.history.length = 10)

      this.updateUI(routeObj, context)
    }

    /**
     * @param {Route} nextView
     * @param {ContextParams} context
     * */
    async updateUI(nextView, context) {
      const component = /** @type {RouteContainerComponent} */ (document.createElement(nextView.componentName))

      try {
        // @ts-ignore
        if (component.routeEnter) await component.routeEnter({ nextView, context })
      } catch (error) {
        console.error(error)
      }

      if (component.onGlobalsUpdate) {
        component.disconnectGlobals = window.Globals.onUpdate(component?.onGlobalsUpdate?.bind(component))
      }

      const slot = this.shadowRoot.querySelector('slot')
      slot.innerHTML = ''
      slot.append(component)
    }
  }
}

/**
 * Chrome fires popstate on load, unlike Firefox and Safari which do not
 * This prevents that behavior and makes Chrome function like FF and S
 */
;(function () {
  let blockPopstateEvent = document.readyState != 'complete'
  window.addEventListener(
    'load',
    () =>
      // The timeout ensures that popstate-events will be unblocked right
      // after the load event occured, but not in the same event-loop cycle.
      setTimeout(function () {
        blockPopstateEvent = false
      }, 0),
    false
  )
  window.addEventListener(
    'popstate',
    (evt) => {
      if (blockPopstateEvent && document.readyState == 'complete') {
        evt.preventDefault()
        evt.stopImmediatePropagation()
      }
    },
    false
  )
})()
