import React, { Component } from 'react';
import { Tree, Input } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import { format } from 'utils'
// three
import { Vector3 } from 'three'
import camera from 'three/camera'
import scene from 'three/scene'
import TWEEN from 'tween.js'
import { controls, domEvents } from 'three/controls'
import data from 'assets/json/data.json';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
var cameraPosition = new TWEEN.Tween(camera.position);
var cameraRotationX = new TWEEN.Tween(camera.rotation.x);

const x = 3;
var y = 2;
const z = 1;
var gData = [
  {
    key:"1号基地发电机",
    title: "0-0",
  }
];


var wrapStyle = {
  position: 'absolute',
  top: '20px',
  textAlign: 'left',
  marginTop: '20px',
  marginLeft: '20px',
  maxWidth: '160px'
};

// 生成一层数据机构
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
// generateList(gData);
// console.log(gData)
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class SearchTree extends Component {
  state = {
    expandedKeys: ['1号基地发电机'],
    searchValue: '',
    autoExpandParent: true,
    windmilList: []
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onChange = (e) => {
    const value = e.target.value;
    console.log(value)
    console.log(gData)
    const expandedKeys = dataList.map((item) => {
      if (item.key.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);

    this.setState({
      searchValue: value
    });
    console.log(this.state)
  }
  onMouseEnter = () => {
    controls.enabled = false;
    controls.enableZoom = false;
    controls.enablePan = false;
  }
  onMouseLeave = () => {
    controls.enabled = true;
    controls.enableZoom = true;
    controls.enablePan = true;
  }
  handleClick = (key) => {
    var key = key[0];
    scene.children && scene.children.some(function (child) {
      if (child.name === 'all-windmill') {
        child.children.some(function (windmill) {
          if (windmill.name === key) {
            var target = windmill;
            cameraPosition.to(new Vector3(target.position.x + 5, target.position.y - 2, target.position.z + 15), 600);
            cameraPosition.start();

            // cameraRotation.start()
            cameraPosition.onComplete(function () {
              controls.autoRotate = true;
              controls.target = target.position;
              /*cameraRotationX.to(10, 600)
              cameraRotationX.start()*/
              controls.update();
              // camera.rotation.set(new THREE.Euler(-0.20783558173798408, 0.09429695894176246, 0.019853346558090398))
            })
            return true
          }
        })
        return true;
      };
    });
  }
  componentWillMount () {
    // 获取数据
    axios.get( window.proPath + 'json/data.json')
      .then( response => {
        gData[0].children = format.array2Array({
          data: response.data.windmillData,
          format: ['key', 'title', 'status'],
          originaFormat: ['名称', '名称', '状态']
        });
        generateList(gData);
        this.setState( () => {
          return {
            windmilList: gData
          }
        })
        // this.onChange()
      })
      .catch(function (error) {
      });
  }
  componentDidMount(){
    // 搜索框自动聚焦
    this.refs.search.input.refs.input.focus()
  }
  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = data => {
      var temp = [];
      for (var i = 0; i < data.length; i++){
        var item = data[i];
        var warningStyle = {color: '#fff'};
        var index = item.key.search(searchValue);
        if (item.status !== 1 && !item.children) {
          warningStyle = {
            color: 'red'
          }
        }
        const beforeStr = item.key.substr(0, index);
        const afterStr = item.key.substr(index + searchValue.length);
        if (!item.children && !~index) {
          continue;
        }
        const title = index > -1 ? (
          <span style={warningStyle}>
            {beforeStr}
            <span style={{ color: '#83B5DA' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : <span style={warningStyle}>{item.key}</span>;
        if (item.children) {
          temp.push((
            <TreeNode key={item.key} title={title}>
              {loop(item.children)}
            </TreeNode>
          ));
        }
        temp.push(<TreeNode key={item.key} title={title}/>);
      }
      return temp
    };
    return (
      <div
        style={wrapStyle}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        >
        <Search
          style={{ width: 160 }}
          placeholder="Search"
          onChange={this.onChange}
          ref="search"
        />
      <Scrollbars
        style={{ width: 160, height: 400, color:'#fff' }}
        >
          <Tree
            onSelect={this.handleClick}
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
          >
            {loop(this.state.windmilList)}
          </Tree>
        </Scrollbars>
      </div>
    );
  }
}

export default SearchTree
