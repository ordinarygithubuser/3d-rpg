import * as Util from '../util';

const material = Util.Material(0xff0000);
const tipGeometry = Util.Sphere(4, 6, 2);
const bladeGeometry = Util.Box(2, 40, 5);

export default () => {
    const mesh = Util.Object3D();
    const tip = Util.Mesh(tipGeometry, material);
    const blade = Util.Mesh(bladeGeometry, material);

    mesh.add(tip);
    mesh.add(blade);
    mesh.type = 'tool';

    mesh.use = player => {
        player.disable();
        setTimeout(player.enable, 500);
    };

    tip.position.y = 7;
    blade.position.y = -15;
    tip.position.x = -23;
    blade.position.x = -15;

    tip.rotateZ(0.3);
    blade.rotateY(0.4);
    blade.rotateZ(0.3);

    return mesh;
}