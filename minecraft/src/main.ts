import { OrbitControls } from 'three/examples/jsm/Addons.js';
import './style.css'

import * as THREE from 'three';
import { World } from './scripts/world';

//Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB)
document.body.appendChild(renderer.domElement);

//Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.set(-32, 16, -32);
camera.lookAt(0, 0, 0);

// Create orbit controls to allow camera movement with mouse
const controls = new OrbitControls(camera, renderer.domElement);
// Set the target point that the camera orbits around (center of the world)
controls.target.set(16,0,16);
// Update controls to apply the new target
controls.update();


//Scene setup
const scene = new THREE.Scene();

//World setup
const world = new World();
world.generate();
scene.add(world)


// Setup lighting for the scene
function setupLights() {
  // Create first directional light coming from top-right
  const light1 = new THREE.DirectionalLight();
  light1.position.set(1, 1, 1); // Position light diagonally from above
  scene.add(light1);

  // Create second directional light coming from bottom-left
  const light2 = new THREE.DirectionalLight();
  light2.position.set(-1, -1, -0.5); // Position light diagonally from below
  scene.add(light2); // Fixed typo: was light2s

  // Add ambient light for overall scene illumination
  const ambient = new THREE.AmbientLight();
  ambient.intensity = 0.1; // Set low intensity to provide subtle fill light
  scene.add(ambient);
}



//Renderer setup
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

//Handle window resize
window.addEventListener('resize', () => {
  // - Updates camera aspect ratio based on new window dimensions
 camera.aspect = window.innerWidth / window.innerHeight;

 // - Recalculates camera projection matrix
 camera.updateProjectionMatrix();

 // - Resizes the renderer to match new window size
 renderer.setSize(window.innerWidth, window.innerHeight);
})

setupLights();
animate()

