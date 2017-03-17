import React, {Component} from 'react'
import {map} from 'lodash'
import FieldGroup from './fieldGroup'

export default class KeyList extends Component {

  render () {
    return(
      <div>
        {map(this.props.fields, (field, index) => {
          return <FieldGroup field={field} index={index} />
        })}
      </div>
    )
  }
}
