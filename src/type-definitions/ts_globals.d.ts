import Globals from '../../src/utilities/Globals'

declare global {
  interface Window {
    // chrome browser
    chrome: any
    Globals: Globals
  }

  interface Navigator {
    // brave browser
    brave: any
  }
}

export default global
