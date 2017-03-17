import React, { Component } from 'react';
import './App.css';
import {parseDataAndGetKeys} from './data/helpers'
import KeyList from './components/keyList'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fields: {}
    }
  }

  componentWillMount () {
    const fields = parseDataAndGetKeys('./testData.json')
    this.setState({
      fields: fields
    })
  }

  render() {
    const {fields} = this.state
    return (
      <div className="App">
        <div className="Fields">
          <KeyList fields={fields}/>
        </div>
      </div>
    );
  }
}

export default App;
