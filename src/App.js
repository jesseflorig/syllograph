import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {parseDataAndGetKeys} from './data/helpers'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keys: {}
    }
  }

  componentWillMount () {
    const keys = parseDataAndGetKeys('./testData.json')
    this.setState({
      keys: keys
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
