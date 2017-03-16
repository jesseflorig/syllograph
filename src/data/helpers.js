import {map, keys, assign} from 'lodash'

function mapKeysOfObject(object, isArray) {
  const children = {}
  map(object, (val, key) => {
    console.log(key)
    const valType = typeof val
    if (valType === 'object'){
      if (val instanceof Array) {
        console.log(`${key} is array`)
        const children = mapArray(val)
        children[key] = mapArray(val)
      } else {
        children[key] = mapKeysOfObject(val)
      }
    } else {
      children[key] = typeof val
    }
  })

  return children
}

function mapArray(array) {
  const dataKeys = {type: 'array'}
  const children = {}
  map(array, entry => {
    const entryKeys = keys(entry)
    return map(entryKeys, key => {
      return children[key] = typeof key
    })
  })
  dataKeys.children = children
  return dataKeys
}

export function parseDataAndGetKeys(file) {
  const data = require(file)
  const dataKeys = {}

  map(data, entry => {
    const entryKeys = keys(entry)
    return map(entryKeys, key => {
      const keyType = typeof entry[key]
      dataKeys[key] = {type: keyType}
      if (keyType === 'object'){
        if (entry[key] instanceof Array) {
          const children = mapArray(entry[key])
          dataKeys[key].children = mapArray(entry[key])
        } else {
          dataKeys[key].children = mapKeysOfObject(entry[key])
        }
      }
    })
  })

  console.log(dataKeys)

}
