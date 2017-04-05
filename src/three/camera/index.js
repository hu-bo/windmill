import { PerspectiveCamera } from 'three'

var camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000000)
// 矫正相机位置
camera.position.set( 12.51448093782977,  27.30322972307993,  129.47237428078742)
camera.rotation.set( -0.20783558173798408,  0.09429695894176246,  0.019853346558090398)
camera.lookAt({x:10,y:50,z:60});

export default camera
