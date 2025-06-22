import {
  appendParamsObjToPath,
  decodeQuerystringValues,
  _arrayFromQsList,
  _normalizeQsValue,
  getRouteByPath,
} from './router-util.js'
import routes from './routes.js'

describe('appendParamsObjToPath', () => {
  test('should append extra params if params already exist', () => {
    expect(appendParamsObjToPath('?some=param', { number: 9 })).toEqual('?some=param&number=9')
  })

  test('should encode values appropriately', () => {
    // Should encode the + symbol appropriately
    const params = {
      email: 'jasonropp4tl+admin@gmail.com',
      bool: true,
    }

    expect(appendParamsObjToPath('', params)).toEqual('?email=jasonropp4tl%2Badmin%40gmail.com&bool=true')
  })
})
describe('decodeQuerystringValues', () => {
  test('should return boolean strings as boolean values', () => {
    expect(decodeQuerystringValues('?bool=true')).toEqual({ bool: true })
    expect(decodeQuerystringValues('?bool=false')).toEqual({ bool: false })
  })

  test('should return number strings as numbers', () => {
    expect(decodeQuerystringValues('?num=1')).toEqual({ num: 1 })
  })

  test('should return encoded as normal symbol', () => {
    expect(decodeQuerystringValues('?email=jasonropp4tl%2Badmin%40gmail.com')).toEqual({
      email: 'jasonropp4tl+admin@gmail.com',
    })
  })

  test('_normalizeQsValue', () => {
    expect(_normalizeQsValue('true')).toEqual(true)
    expect(_normalizeQsValue('false')).toEqual(false)
    expect(_normalizeQsValue('0')).toEqual(0)
    expect(_normalizeQsValue('1')).toEqual(1)
    expect(_normalizeQsValue('some string')).toEqual('some string')
    expect(_normalizeQsValue('some string,another string')).toEqual(['some string', 'another string'])
    expect(_normalizeQsValue('1,2,3')).toEqual([1, 2, 3])
  })

  test('_arrayFromQsList', () => {
    expect(_arrayFromQsList('1,2,3')).toEqual([1, 2, 3])
    expect(_arrayFromQsList('true,false')).toEqual([true, false])
    expect(_arrayFromQsList('some string,another string')).toEqual(['some string', 'another string'])
  })
})

describe('getRouteByPath', () => {
  it('should return the correct route', () => {
    expect(getRouteByPath(routes.LOGIN.path, routes)).toEqual(routes.LOGIN)
    expect(getRouteByPath(routes.MAP.children.RESOURCES.path, routes)).toEqual(routes.MAP.children.RESOURCES)
    expect(getRouteByPath(routes.MAP.children.RESOURCES.children.CATEGORIES.path, routes)).toEqual(
      routes.MAP.children.RESOURCES.children.CATEGORIES
    )
  })
})
