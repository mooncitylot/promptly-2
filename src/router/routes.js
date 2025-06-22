import { pathToRegexp } from 'path-to-regexp'
import { userIsLoggedIn } from './router-permissions.js'

/**
 * Processes a single route object and adds the pathToRegexp property.
 * @param {string} key - The key of the route object.
 * @param {Route} route - The route object to process.
 * @param {Route|null} parentRoute - The parent route object.
 * @returns {Route} - The processed route object.
 */
function processRoute(key, route, parentRoute = null) {
  const id = route.id || key.toUpperCase()
  const lcid = id.toLowerCase().replace('_', '-')

  // Build the path of the current route, by prepending the parent route's path if available
  const path = route.path || (parentRoute ? `${parentRoute.path}/${lcid}` : `/${lcid}`)

  const componentName = route.componentName || path.replace('/', '').split('/').join('-') + '-container'

  // Build the component path of the current route, by prepending the parent route's component path if available
  const componentPath = route.componentPath || `${path}/${componentName}`.replace('/', '')

  // Any sub routes should have a back arrow
  const showBackArrow =
    route?.backArrowLocation || route.hasOwnProperty('showBackArrow') ? route.showBackArrow : !!parentRoute

  const processed = {
    id,
    path,
    pathRegexp: pathToRegexp(path),
    componentPath,
    componentName,
    isPublic: route.isPublic || false,
    showNav: route.showNav || false,
    showBackArrow,
    showHeader: route.showHeader ?? true,
    showHeaderQuickNav: route.showHeaderQuickNav || false,
    permissions: route.permissions || [],
    children: route.children || {},
    backArrowLocation: route.backArrowLocation ?? (parentRoute ? parentRoute.path : null),
  }
  // After parent is initialized, we can process the child routes
  processed.children = processRoutes(processed.children, processed)

  return processed
}

/**
 * Processes the given route objects and adds the pathToRegexp property.
 * @param {Object<string, Route>} routes - The route objects to process.
 * @param {Route|null} parentRoute - The parent route object.
 * @returns {Object<string, Route>} - The processed route objects.
 */
function processRoutes(routes, parentRoute = null) {
  return Object.entries(routes).reduce((acc, [key, route]) => {
    // @ts-ignore
    acc[key] = processRoute(key, route, parentRoute)
    return acc
  }, {})
}

/** @type {Route} */
const ADMIN = processRoute('ADMIN', {
  showNav: true,
  permissions: [userIsLoggedIn],
  children: {
    USERS: {
      showHeaderQuickNav: true,
    },
  },
})

export const routes = processRoutes({
  SANDBOX: {
    isPublic: true,
  },
  HOME: {
    isPublic: true,
  },
})

export default routes
