import React from 'react'
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link
} from 'react-router-dom'
import WindmillList from 'components/windmill-list'
const router = () => (
  <HashRouter>
    <div>
      <div className="header text-center">
        <div className="banner">
          <Link to="/" title="主页">
            <img src={window.proPath + 'img/1.png'}/>
          </Link>
          <Link to="/WindmillList" title="1号基地发电机">
            <img src={window.proPath + 'img/2.png'}/>
          </Link>
          <Link to="/" title="暂未开发">
            <img className="not-allowed" src={window.proPath + 'img/2.png'}/>
          </Link>
          <img className="not-allowed" src={window.proPath + 'img/2.png'} title="暂未开发"/>
          <img className="not-allowed" src={window.proPath + 'img/2.png'} title="暂未开发"/>
        </div>
      </div>
      <Route exact path="/" component={Home}/>
      <Route path="/WindmillList" component={WindmillList}/>
    </div>
  </HashRouter>
)

const Home = () => (
  <div>
  </div>
)

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
