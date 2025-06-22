## Getting Started

`npm i`
`npm start`

Open browser at `localhost:8000/login`

### Creating A New View

1. Add a new view component to `src/views/[name-of-view]/[name-of-view-container].js`

_Note: See "Creating A Sub Route" for sub routes_

2. The component should have the same name as the file for it's html tag.

**[name-of-view]-container.js**

```js
import { LitElement, html, css } from 'lit'
class [NameOfView]ContainerElement extends LitElement {
  static properties = {}
  constructor() {
    super()
  }
  render() {
    return html``
  }
}
customElements.define('[name-of-view]-container', [NameOfView]ContainerElement)
export default [NameOfView]ContainerElement
```

3. Add new route in `src/router/routes.js`.

```js
export const routes = processRoutes({
  MAP: {},
})
```

_This is the bare minimum needed to build the route. The `MAP` key is used to populate any needed default values for path, componentName, etc. See the `Route` model for available options._

### Creating A Sub Route

To add a route RESOURCES as a sub-route of MAP, add it to `MAP.children`. The route configuration is same, no matter how many levels you go down.

In this example I also added CATEGORIES as a sub-route of RESOURCES.

**routes.js**

```js
export const routes = processRoutes({
  MAP: {
    children: {
      RESOURCES: {
        showNav: false,
        showHeaderQuickNav: true,
        children: {
          CATEGORIES: {},
        },
      },
    },
  },
})
```

This creates routes accessible at:

- `/map`
- `/map/resources`
- `/map/resources/categories`

and looks for the components at

- `/views/map/map-container.js`
- `/views/map/resources/map-resources-container.js`
- `/views/map/resources/categories/map-resources-categories-container.js`
