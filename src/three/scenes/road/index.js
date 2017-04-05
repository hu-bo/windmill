import scene from 'three/scene'
import { Group } from 'three'
import {
  loadJson
} from 'three/loaders'

loadJson([
    window.proPath + 'json/road.json'
],function (obj) {
  var group = new Group();
  group.name = 'all-road'
  for(var j = 0; j < 60; j++){
    var road = obj.clone()
    road.position.x = -200
    road.position.z = j*60 - 2000
    road.name = 'road' + j
    group.add(road)
  }
  scene.add(group)
})
