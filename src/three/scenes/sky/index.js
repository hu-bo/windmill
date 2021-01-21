var THREE = require('three');
var Detector = require('three/helpers/Detector')
require('./SkyShader')
import camera from 'three/camera'
import scene from 'three/scene'
import { renderer } from 'three/renderer'
import controls from 'three/controls'
import dat from '../../helpers/dat.gui.min.js'

if ( ! Detector.webgl ) {
	Detector.addGetWebGLMessage();
}
var sky, sunSphere;
init();
function initSky() {
	// Add Sky Mesh
	sky = new THREE.Sky();
	scene.add( sky.mesh );
	// Add Sun Helper
	sunSphere = new THREE.Mesh(
		new THREE.SphereBufferGeometry( 20000, 16, 8 ),
		new THREE.MeshBasicMaterial( { color: 0xffffff } )
	);
	sunSphere.position.y = - 700000;
	sunSphere.visible = false;
	scene.add( sunSphere );
	/// GUI
	var effectController  = {
		turbidity: 12.3,
		rayleigh: 2.506,
		mieCoefficient: 0.001,
		mieDirectionalG: 0.627,
		luminance: 0.6,
		inclination: 0.4749, // elevation / inclination
		azimuth: 0.3014, // Facing front,
		sun: ! true
	};
	var distance = 400000;
	function guiChanged() {
		var uniforms = sky.uniforms;
		uniforms.turbidity.value = effectController.turbidity;
		uniforms.rayleigh.value = effectController.rayleigh;
		uniforms.luminance.value = effectController.luminance;
		uniforms.mieCoefficient.value = effectController.mieCoefficient;
		uniforms.mieDirectionalG.value = effectController.mieDirectionalG;
		var theta = Math.PI * ( effectController.inclination - 0.5 );
		var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );
		sunSphere.position.x = distance * Math.cos( phi );
		sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
		sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );
		sunSphere.visible = effectController.sun;
		sky.uniforms.sunPosition.value.copy( sunSphere.position );
	}
/*	var gui = new dat.GUI();
	gui.add( effectController, "turbidity", 1.0, 20.0, 0.1 ).onChange( guiChanged );
	gui.add( effectController, "rayleigh", 0.0, 4, 0.001 ).onChange( guiChanged );
	gui.add( effectController, "mieCoefficient", 0.0, 0.1, 0.001 ).onChange( guiChanged );
	gui.add( effectController, "mieDirectionalG", 0.0, 1, 0.001 ).onChange( guiChanged );
	gui.add( effectController, "luminance", 0.0, 2 ).onChange( guiChanged );
	gui.add( effectController, "inclination", 0, 1, 0.0001 ).onChange( guiChanged );
	gui.add( effectController, "azimuth", 0, 1, 0.0001 ).onChange( guiChanged );
	gui.add( effectController, "sun" ).onChange( guiChanged );*/
	guiChanged();
}
function init() {
	//camera.setLens(20);
	var helper = new THREE.GridHelper( 10000, 2, 0xffffff, 0xffffff );
	//camera.position.set( 0, 100, 2000 );
	// scene.add( helper );
	//renderer.setPixelRatio( window.devicePixelRatio );
	initSky();
}

export default {}
