import {map, keys, assign, merge} from 'lodash'

function getFieldsFromObject(object, isArray) {
  const fields = {}
  map(object, (val, key) => {
    const valType = typeof val

    fields[key] = {type: valType}
    if (valType === 'object'){
      if (val instanceof Array) {
        console.log(val)
        fields[key] = getFieldsFromArray(val)
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
    if (typeof entry === 'object') {
      const entryKeys = keys(entry)
      map(entryKeys, (key) => {
        const keyType = typeof entry[key]
        if (keyType === 'object'){
          if (entry[key] instanceof Array) {
            fields[key] = getFieldsFromArray(entry[key])
          } else {
            fields[key].fields = merge(fields[key].fields, getFieldsFromObject(entry[key]))
          }
        } else {
          fields[key] = {type: keyType}
        }
      })
    } else {
      fields[entry] = {type: typeof entry}
    }
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
          dataKeys[key].fields = merge(dataKeys[key].fields, getFieldsFromArray(entryField))
        } else {
          dataKeys[key].fields = merge(dataKeys[key].fields, getFieldsFromObject(entryField))
        }
      }
    })
  })

  console.log('datakeys:',dataKeys)

}
