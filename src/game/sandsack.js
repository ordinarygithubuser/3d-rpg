import THREE from 'three';

export default scene => {
    const mesh = new THREE.Mesh(
        new THREE.CubeGeometry(3, 5, 3),
        new THREE.MeshLambertMaterial({ color: 0x0000ff })
    );

    mesh._update = () => {

    };

    return Entity(scene, mesh, { x: -40, y: 2.5 });
}
