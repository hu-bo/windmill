import { Mesh, TextureLoader, BoxGeometry, MeshBasicMaterial, RepeatWrapping } from 'three'
import scene from 'three/scene'
import { renderer } from 'three/renderer'
import grassImg from 'assets/img/grass.png'
var initFloor = function () {
  var texture = new TextureLoader().load(grassImg);
  /*var spriteMaterial = new SpriteMaterial( { map: texture, color: 0xffffff } );*/
  var maxAnisotropy = renderer.getMaxAnisotropy();
  var floorGeometry = new BoxGeometry( 10000, 0.2, 10000 );
  var floorMaterial = new MeshBasicMaterial( { map: texture, transparent:true } );
  texture.wrapS = texture.wrapT = RepeatWrapping;
	texture.repeat.set( 1024, 1024 );
  var floor = new Mesh( floorGeometry, floorMaterial );
  scene.add( floor );
}
initFloor()
