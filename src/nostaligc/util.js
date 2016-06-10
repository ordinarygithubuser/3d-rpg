import THREE from 'three';
import Sky from './shader/sky';

Sky(THREE);

export const Mesh = (geometry, material, flip, slope) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    if (flip) mesh.rotateX(-Math.PI / 2);
    if (slope) mesh.slope = true;
    return mesh;
};

export const Box = (x = 10, y = 10, z = 10) => {
    return new THREE.BoxGeometry(x, y, z);
};

export const Plane = (width, height, buffer) => {
    if (!buffer) return new THREE.PlaneGeometry(width, height);
    return new THREE.PlaneBufferGeometry(width, height);
};

export const Material = (color, opacity = 1, wireframe = false) => {
    return new THREE.MeshPhongMaterial({ color, opacity, wireframe });
};

export const PointLight = (color, intensity = 1, distance = 1000) => {
    const point = new THREE.PointLight(color, intensity, distance);
    point.castShadow = true;
    return point;
};

export const AmbientLight = color => {
    return new THREE.AmbientLight(color);
};

export const Object3D = () => {
    return new THREE.Object3D();
};

export const Vector = (x = 0, y = 0, z = 0) => {
    return new THREE.Vector3(x, y, z);
};

export const Sphere = (radius = 50, widthSegments = 8, heightSegments = 6, buffer) => {
    if (!buffer) return new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    return new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
};

export const RayCaster = () => {
    return new THREE.Raycaster();
};

export const Sunset = scene => {
    const wrapper = Object3D();
    const sky = new THREE.Sky();
    const sun = Mesh(Sphere(2000, 16, 8, true), Material(0xffffff));

    wrapper.sun = sun;
    wrapper.sky = sky;
    wrapper.add(sun);
    wrapper.add(sky.mesh);
    return wrapper;
};