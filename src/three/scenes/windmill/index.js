var THREE = require('three')
import camera from 'three/camera'
import scene from 'three/scene'
import { renderer, animate } from 'three/renderer'
import TWEEN from 'tween.js'
import { loadJson } from 'three/loaders'
import { math } from 'utils'
import { controls, domEvents } from 'three/controls'
import Modal from 'plugins/Modal/index-es6'
import axios from 'axios';
import windmillUrl from 'assets/json/windmill.json'
/*
  @param {number} col
  @param {number} row
  @return {array} All windmills
*/
var tempData = []
var windmills = (function (l, m)　{
  loadJson([
      window.proPath + 'json/windmill.json',
      //windmillUrl
  ],function (obj) {
    console.log(obj)
    var group = new THREE.Group();
    group.name = 'all-windmill'
    for (var i = 0; i < l; i++) {
      for(var j = 0; j < m; j++){
        var windmill = obj.clone()
        var staus = 1
        var msg = ''
        windmill.position.x = i*50 - 180
        windmill.position.y = 19
        windmill.position.z = j*50 - 140
        windmill.name = 'windmill' + i +j
        /*if (i===4 && (j === 4 || j === 1)) {
          staus = 0
          msg = '发电机电流过大'
        }
        if (i === 0 && j === 0) {
          staus = 0
          msg = '发电机电流不稳定,需要派人检修'
        }
        windmill.userData = {
              "状态": staus,
              "名称": "windmil" + i + j,
              "电流": math.random(350,400) + "A",
              "电压": math.random(45000,5000) + "V",
              "额定功率": "100KW",
              "实际功率": math.random(90,100) + "KW",
              "错误信息": msg,
              "其他":""
        }*/
        tempData.push(windmill.userData)
        group.add(windmill)
        addWindmilEvent(windmill)
        // windmill.children[0].rotateOnAxis (windmill.children[0].children[0], 0.1)
      }
    }

    // 获取数据
    axios.get( window.proPath + 'json/data.json')
      .then( response => {
        var windmillData = response.data.windmillData;
        var windmills = [];
        console.log(windmillData)
        scene.children && scene.children.some(function (child) {
          if (child.name === 'all-windmill') {
            windmills = child.children;
          };
        });
        windmillData.forEach(function (data, i) {
          windmills[i].userData = data
        })
        // 加状态
        addWindmillStatus(group)
      })
      .catch(function (error) {
      });
     scene.add(group)
      
      animate()
      return group
  })
})(8,6)

// 模态框
var modalBody = null;
var modal= null;
window.setTimeout(function () {
  modalBody = document.querySelector("#show-box-info .modal-body")
  modal = new Modal({
      el:document.getElementById('show-box-info'),
      enterClass:'zoomIn',
      exitClass:'zoomOutDown'
  });
},0);
/*
  判断Mesh是否存在并加事件
  @param {Object} 加载外部资源回调的对象
  @return {void}
 */
var cameraPosition = new TWEEN.Tween(camera.position)
var cameraRotationX = new TWEEN.Tween(camera.rotation.x)
function addWindmilEvent (obj) {
  domEvents.addEventListener( obj,'click', function (ev) {
    var target = ev.target

    cameraPosition.to(new THREE.Vector3(target.position.x + 5, target.position.y - 2, target.position.z + 15), 600)
    cameraPosition.start()

    // cameraRotation.start()
    cameraPosition.onComplete(function () {
      controls.autoRotate = true
      controls.target = target.position
      /*cameraRotationX.to(10, 600)
      cameraRotationX.start()*/
      controls.update()
      // camera.rotation.set(new THREE.Euler(-0.20783558173798408, 0.09429695894176246, 0.019853346558090398))
      console.log(camera.rotation)
    })
    var li=""
    for(var key in target.userData){
      var status = '正常'
      var result = target.userData[key]
      if (key === "状态") {
        status = target.userData[key] === 0 ? '异常' : '正常'
        result = status
      }

        li += '<li>\
                <span>'+ key +':</span>\
                <span>'+ result +'</span>\
             </li>'
    }
    modalBody.innerHTML="<ul>"+li+"</ul>"
    modal.show();
    return false
  }, false );
}
/*
  给风车加状态
  @param {Array} 所有服务器箱
  @return void
 */
function addWindmillStatus (objects) {
  if (!objects) {
    return false
  }
  /*var spriteMap = new THREE.TextureLoader().load( './assets/img/warning.png' );
  var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
  var sprite = new THREE.Sprite( spriteMaterial );*/
  var setColor = function (Mesh) {
    if (Mesh.type === 'Mesh') {
      var materialJSON = Mesh.material.toJSON()
      var material = new THREE.MeshStandardMaterial({
        emissive: materialJSON.emissive,
        color:'red'
      })
      Mesh.material = material
    }
  }
  objects.children.map(function (obj, i) {
    if (obj.children.length > 0 && obj.userData["状态"] === 0) {
      obj.children.map(function (Mesh) {
        if (Mesh.type === 'Group') {
          Mesh.children.map(function (Mesh) {
            setColor(Mesh)
          })
        } else {
          setColor(Mesh)
        }
      })
    }
  })
}

export {
  windmills
}
