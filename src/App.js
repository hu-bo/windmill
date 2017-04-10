import React, { Component } from 'react'
import Rotuer from './router'
import {
  Link
} from 'react-router-dom'
// import { Button } from 'antd'
// import Loading from 'views/loading'
import './App.css'

class App extends Component {
  getInitialState () {
    return {
      done: true
    }
  }
  render() {
    const { state } = this;
    return (
      <div className="App">
        <div id="show-box-info" className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="text-center">设备信息</h4>
                </div>
                <div className="modal-body text-left">
                    <ul>
                        <li>
                            <span>:</span>
                            <span></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Rotuer/>
      </div>
    );
  }
}
// <Rotuer/>
export default App;
