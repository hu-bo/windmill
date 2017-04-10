import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link
} from 'react-router-dom'
import WindmillList from 'components/windmill-list'
// three
import { Vector3 } from 'three'
import camera from 'three/camera'
import TWEEN from 'tween.js'
import { controls } from 'three/controls'

import homeBg from 'assets/img/1.png'
import windmillBg from 'assets/img/2.png'

var cameraPosition = new TWEEN.Tween(camera.position)
const router = () => (
  <HashRouter>
    <div>
      <div className="header text-center">
        <div className="banner">
          <Link to='./' title="主页">
            <img src={homeBg}/>
          </Link>
          <Link to="./WindmillList" title="1号基地发电机">
            <img src={windmillBg}/>
          </Link>
          <Link to="/" title="暂未开发">
            <img className="not-allowed" src={windmillBg}/>
          </Link>
          <img className="not-allowed" src={windmillBg} title="暂未开发"/>
          <img className="not-allowed" src={windmillBg} title="暂未开发"/>
        </div>
      </div>
      <Route exact path="/" component={Home}/>
      <Route path="/WindmillList" component={WindmillList}/>
    </div>
  </HashRouter>
)

class Home extends Component{
  componentDidMount () {
    cameraPosition.to(new Vector3(12.51448093782977, 27.30322972307993, 129.47237428078742), 600)
    cameraPosition.start()
    camera.rotation.set( -0.20783558173798408,  0.09429695894176246,  0.019853346558090398)
    cameraPosition.onComplete(function () {
      controls.autoRotate = true
      controls.target = new Vector3(0, 0, 0)
      controls.update()
    })
  }
  render () {
    return (
      <div />
    );
  }
}
/*const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)*/

/*const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)*/

export default router
