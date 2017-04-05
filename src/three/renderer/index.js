import camera from '../camera'
import scene from '../scene'
import { WebGLRenderer } from 'three'
import TWEEN from 'tween.js'

var renderer = null
var windowHalfX = window.innerWidth / 2
var windowHalfY = window.innerHeight / 2

var initRenderer = function () {
    renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.setClearColor(0x101010, 1.0)
    window.addEventListener( 'resize', onWindowResize, false )
}
var onWindowResize = function () {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
initRenderer()

//动画

var animate = function () {
  scene.children.some(function (item) {
    if (item.name === "all-windmill") {
      item.children.map(function (windmill) {
        var group = windmill.children[0]
        //group.rotation.x += 0.1;
				group.rotation.y += 0.3;
      })
      return true
    }
  })
  TWEEN.update();
  requestAnimationFrame( animate );
  renderer.render(scene, camera);
};

export {
  renderer,
  animate
}
