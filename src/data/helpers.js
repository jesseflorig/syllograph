import {map, reduce, keys, toPairs} from 'lodash'

function mapKeysOfObject(object, isArray) {
  const children = {}
  map(object, (val, key) => {
    const valType = typeof val
    if (valType === 'object'){
      children[key] = mapKeysOfObject(val)
    } else {
      children[key] = typeof val
    }
  })

  return children
}

function mapArray(array) {
  const dataKeys = {}
  map(array, entry => {
    const entryKeys = keys(entry)
    return map(entryKeys, key => {
      const keyType = typeof entry[key]
      dataKeys[key] = keyType
    })
  })
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
        const children = {}
        if (entry[key] instanceof Array) {
          dataKeys[key].children = mapArray(entry[key])
        } else {
          dataKeys[key].children = mapKeysOfObject(entry[key])
        }
      }
    })
  })

  console.log(dataKeys)

}
