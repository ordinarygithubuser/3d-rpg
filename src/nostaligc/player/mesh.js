import * as Util from '../util';
import * as Animation from './animation';

const headGeometry = Util.Sphere(12, 8, 8);
const bodyGeometry = Util.Sphere(11, 10, 10);
const armGeometry = Util.Sphere(5, 4, 4);
const handGeometry = Util.Sphere(5, 4, 4);
const legGeometry = Util.Sphere(5, 4, 4);
const footGeometry = Util.Sphere(6, 4, 4);

const material = Util.Material(0xa0d290);

const Leg = (x, y, rotZ) => {
    const leg = Util.Mesh(legGeometry, material);
    const foot = Util.Mesh(footGeometry, material);
    const box = Util.Object3D();

    leg.position.x = x;
    leg.position.y = y;
    leg.scale.set(1, 3.5, 1);

    foot.scale.set(1, 1, 1.5);
    foot.position.x = x * 1.4;
    foot.position.y = y - 12;
    foot.position.z = 2;

    box.add(leg);
    box.add(foot);
    leg.rotateZ(rotZ);
    return box;
};

const Arm = (x, y, rotZ) => {
    const arm = Util.Mesh(armGeometry, material);
    const hand = Util.Mesh(handGeometry, material);
    const box = Util.Object3D();

    box.position.set(x, y + 20, 0);
    arm.position.x = 0;
    arm.position.y = y - 20;
    arm.scale.set(1, 3.5, 1);
    arm.rotateZ(rotZ);

    hand.position.x = x * 0.5;
    hand.position.y = y - 35;

    box.add(arm);
    box.add(hand);
    return box;
};

const Body = (x, y) => {
    const box = Util.Object3D();
    const body = Util.Mesh(bodyGeometry, material);

    body.scale.set(1, 1.7, 1);
    body.rotation.x = -0.08;

    box.add(body);
    return box;
};

export default scene => {
    let leftBase = 0.08;
    let rightBase = -0.08;
    let round = 0;
    let step = 0;
    let dir = 1;

    const mesh = Util.Object3D();
    const head = Util.Mesh(headGeometry, material);
    const body = Body();
    const armLeft = Arm(15, 0, 0.4);
    const armRight = Arm(-15, 0, -0.4);
    const legLeft = Leg(-10, -30, -0.3);
    const legRight = Leg(10, -30, 0.3);

    const animateWalk = () => {
        step += 0.2;

        legLeft.rotateX(dir * leftBase);
        legRight.rotateX(dir * rightBase);
        armLeft.rotateX(leftBase * dir);
        armRight.rotateX(rightBase * dir);

        if (step >= 2) {
            round++;
            step = 0;
            dir = dir == 1 ? -1 : 1;
            if (round % 2 == 0) {
                let tmp = leftBase;
                leftBase = rightBase;
                rightBase = tmp;
                legLeft.rotation.x = 0;
                legRight.rotation.x = 0;
                armLeft.rotation.x = 0;
                armRight.rotation.x = 0;
            }
        }
    };

    head.position.y = 0;
    head.position.y = 30;

    mesh.add(head);
    mesh.add(body);
    mesh.add(armLeft);
    mesh.add(armRight);
    mesh.add(legLeft);
    mesh.add(legRight);
    mesh.head = head;
    mesh.body = body;
    mesh.arms = [armLeft, armRight];
    mesh.legs = [legLeft, legRight];
    let running = false;

    mesh.position.set(0, 46, 1000);
    mesh.castShadow = true;
    scene.add(mesh);

    mesh.walk = impulse=> {
        if (!running) {
            running = true;
            Animation.walk(mesh);
        }
        Animation.turn(mesh, impulse);
        animateWalk();
    };

    mesh.stop = () => {
        if (running) {
            running = false;
            Animation.stand(mesh);
        }
    };

    return mesh;
}