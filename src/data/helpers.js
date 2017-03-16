import {map, keys, assign, merge} from 'lodash'

function getFieldsFromObject(object, isArray) {
  const fields = {}
  map(object, (val, key) => {
    const valType = typeof val

    fields[key] = {type: valType}
    if (valType === 'object'){
      if (val instanceof Array) {
        console.log('key is',key)
        console.log('fields before:',fields[key])
        fields[key] = getFieldsFromArray(val)
        console.log('fields after',fields[key])
      } else {
        fields[key].fields = getFieldsFromObject(val)
      }
    }
  })

  return fields
}

function getFieldsFromArray(array) {
  const dataKeys = {type: 'array'}
  const fields = {}
  map(array, entry => {
    const entryKeys = keys(entry)
    map(entryKeys, (key) => {
      const keyType = typeof entry[key]
      fields[key] = {type: keyType}
    })
  })
  dataKeys.fields = fields
  return dataKeys
}

export function parseDataAndGetKeys(file) {
  const data = require(file)
  const dataKeys = {}

  map(data, entry => {
    const entryKeys = keys(entry)
    return map(entryKeys, key => {
      const entryField = entry[key]
      const keyType = typeof entryField
      if(!dataKeys[key]) {
        dataKeys[key] = {type: keyType}
      }
      if (keyType === 'object'){
        if (entry[key] instanceof Array) {
          console.log('before',dataKeys[key].fields)
          dataKeys[key].fields = merge(dataKeys[key].fields,getFieldsFromArray(entryField))
          console.log('after',dataKeys[key].fields)
        } else {
          console.log('calling')
          console.log('key is', key)
          dataKeys[key].fields = merge(dataKeys[key].fields, getFieldsFromObject(entryField))
        }
      }
    })
  })

  console.log('datakeys:',dataKeys)

}
