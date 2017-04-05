// css样式
import 'assets/css/base.min.css'
import 'assets/css/common.css'
import 'assets/css/animate.css'
// es6 polyfill
import 'babel-polyfill'

// react
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import App from './App'
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
// three
import './three'
import banner from 'plugins/banner'
banner({
  item:document.querySelectorAll('.header .banner img')
})
