// Import Three.js library
import * as THREE from 'three';

// Create a cube geometry that will be reused for all blocks
const geometry = new THREE.BoxGeometry();
// Create a green material that will be reused for all blocks
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

// World class that extends THREE.Group to contain all blocks
export class World extends THREE.Group {
    // Size of the world (number of blocks along each axis)
    private size: number;
    
    // Constructor takes optional size parameter defaulting to 32
    constructor(size = 32) {
        super(); // Call parent THREE.Group constructor
        this.size = size;
    }

    // Generate the world by creating and positioning blocks
    generate() {
    // Loop through x coordinates
    for(let x = 0; x <= this.size; x++) {
        // Loop through z coordinates
        for(let z = 0; z <= this.size; z++) {
            // Create a new block mesh using shared geometry and material
            const block = new THREE.Mesh(geometry, material);
            // Position the block at current x,z coordinates (y=0 for flat surface)
            block.position.set(x,0,z)
            // Add the block as a child of this group
            this.add(block);
        }
    }
    }
}