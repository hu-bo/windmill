import React, { Component } from 'react'
import { Progress } from 'antd';
const loadingStyle = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#000'
}
class Loading extends Component {
  constructor(props) {
    super(props)
  }
  propTypes () {
    return {
      percent: PropTypes.number
    }
  }
  getDefaultProps () {
    return {
      percent: 0
    }
  }
  render () {
    const { state, props, context } = this;
    return (
      <div style={loadingStyle}>
        <Progress percent={props.percent} status="active" style={{marginTop: '20%'}}/>
      </div>
    );
  }
}
export default Loading
