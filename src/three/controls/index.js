import camera from '../camera'
import scene from '../scene'
import { renderer } from '../renderer'
import OrbitControls from './OrbitControls'
import THREEx from './threex.domevents'
var controls = new OrbitControls(camera)
// 鼠标控制
controls.addEventListener('change', function (ev) {
    // renderer.render(scene, camera);
})
//controls.maxPolarAngle = Math.PI / 2;
controls.enableZoom = true;
controls.enablePan = true;
// 点击事件
var domEvents   = new THREEx.DomEvents(camera, renderer.domElement)

export {
  controls,
  domEvents
}
