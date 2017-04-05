// 3d必备：camera,scene,renderer
import camera from './camera'
import scene from './scene'
import { renderer, animate } from './renderer'
// 灯光
import { pointLight, ambientLight } from './scenes/light'
// loader
import {
  jsonLoader,
  objLoader,
  mtlLoader,
  loadJson
} from './loaders'
// controls(鼠标交互)
import { controls, domEvents } from './controls'
// scenes:
import './scenes/road'
import './scenes/sky'
import './scenes/floor'
import './scenes/windmill'
// assets:3D model,img

/*loadJson([
    window.proPath + 'json/wall.json'
    ])*/
// render to browser
renderer.render(scene, camera)
document.body.appendChild( renderer.domElement )
animate()
