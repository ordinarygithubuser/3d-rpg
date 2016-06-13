import * as Util from '../util';

const material = Util.Material(0xff0000);
const tipGeometry = Util.Sphere(8, 6, 2);
const bladeGeometry = Util.Plane(20, 2);

export default () => {
    const mesh = Util.Object3D();
    const tip = Util.Mesh(tipGeometry, material);
    const blade = Util.Mesh(bladeGeometry, material);

    mesh.add(tip);
    mesh.add(blade);
    mesh.type = 'tool';

    mesh.use = player => {
        player.equip(mesh);
        player.disable();
        setTimeout(player.enable, 500);
    };

    tip.position.y = 20;
    blade.position.y = -15;

    return mesh;
}