import THREE from 'three';
import Controls from './controls';

const conf = {
    antialias: true,
    shadowMapEnabled: true,
    shadowMapType: THREE.PCFSoftShadowMap
};

const Camera = (width, height) => {
    const wrapper = new THREE.Object3D();
    const camera = new THREE.PerspectiveCamera(60, width / height, 100, 2000000);
    wrapper.add(camera);
    wrapper.getCam = () => camera;
    return wrapper;
};

export default (Scene, Player) => {
    const camera = Camera(window.innerWidth, window.innerHeight);
    const scene = new Scene();
    const player = Player(scene, camera);
    const controls = Controls(scene, player);
    const node = document.getElementById('root');
    const renderer = new THREE.WebGLRenderer(conf);

    const render = () => {
        requestAnimationFrame(render);
        scene.update();
        controls.update();
        camera.getCam().lookAt(camera);
        renderer.render(scene.get(), camera.getCam());
    };

    const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
    };

    resize(renderer, camera);
    node.appendChild(renderer.domElement);

    camera.position.set(player.mesh.position.x, player.mesh.position.y, player.mesh.position.z);
    camera.getCam().position.set(0, 100, 800);
    camera.getCam().lookAt(player.mesh.position);
    scene.add(camera);

    window.addEventListener('resize', resize);

    requestAnimationFrame(render);
}