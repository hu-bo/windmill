import React, { Component } from 'react';
import { Tree, Input } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import { format } from 'utils'
// three
import scene from 'three/scene'
import { controls, domEvents } from 'three/controls'
import data from 'assets/json/data.json';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
//this.search = input.input.refs.input
const x = 3;
const y = 2;
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

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
// generateData(z)
// console.log(gData)
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
      autoExpandParent: true,
    });
  }
  onChange = (e) => {
    const value = e.target.value;
    // console.log(dataList)
    const expandedKeys = dataList.map((item) => {
      console.log(item.key.indexOf(value))
      if (item.key.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      searchValue: value,
      autoExpandParent: true
    });
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
  handleClick = () => {
    console.log(scene)
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
        console.log(gData)
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
    const loop = data => data.map((item) => {
      const index = item.key.search(searchValue);
      const beforeStr = item.key.substr(0, index);
      const afterStr = item.key.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#5FA9DA' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.key}</span>;
      if (item.children) {
        return (
          <TreeNode key={item.key} title={title} onMouseEnter={this.handleClick}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} onMouseEnter={this.handleClick}/>;
    });
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
