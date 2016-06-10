import THREE from 'three';
import Controls from './controls';

const getDimensions = () => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    return { width, height };
};

const resize = renderer => {
    const { width, height } = getDimensions();
    renderer.setSize(width, height);
};

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
    const { width, height } = getDimensions();
    const camera = Camera(width, height);
    const scene = new Scene();
    const player = Player(scene, camera);
    const controls = Controls(scene, player);
    const node = document.getElementById('root');
    const renderer = new THREE.WebGLRenderer(conf);

    const render = () => {
        requestAnimationFrame(render);
        scene.update();
        controls.update();
        renderer.render(scene.get(), camera.getCam());
    };

    renderer.setSize(width, height);
    node.appendChild(renderer.domElement);

    camera.getCam().position.set(0, 200, 1400);
    camera.getCam().lookAt(player.mesh.position);
    scene.add(camera);

    window.addEventListener('resize', () => {
        resize(renderer);
    });

    requestAnimationFrame(render);
}