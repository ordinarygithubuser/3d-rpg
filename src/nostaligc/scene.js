import THREE from 'three';

export default class NScene {
    constructor () {
        this.scene = new THREE.Scene();
        this.obstacles = this.setupObstacles();
        this.lights = this.setupLights();

        this.obstacles.map(obstacle => {
            this.scene.add(obstacle);
        });

        this.lights.map(light => {
            this.scene.add(light);
        });
    }

    add (mesh) {
        this.scene.add(mesh);
    }

    update () {
        // implement
    }

    setupObstacles () {
        return [];
    };

    setupLights () {
        return [];
    };

    get () {
        return this.scene
    }
};