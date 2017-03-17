import React, {Component} from 'react'
import {map} from 'lodash'
import styles from './fields.css'

export default class FieldGroup extends Component {
  render () {
    const {field, index} = this.props
    return(
      <div className="field-group">
      {index &&
        <div className="field-item parent">
        <a className="field-item parent">{index} - <span className="field-item-type --{field.type}">{field.type}</span></a>
        </div>
      }
      {map(field.fields, (field, index) => {
        return(
          <div className="field-item child">
            <a>{index} - <span className="field-item-type">{field.type}</span></a>
            {field.fields &&
              <FieldGroup field={field}/>
            }
          </div>
        )
      })}
      </div>
    )
  }
}
