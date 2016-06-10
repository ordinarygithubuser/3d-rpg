import * as Util from '../util';

const headGeometry = Util.Sphere(12, 8, 8);
const bodyGeometry = Util.Sphere(11, 10, 10);
const armGeometry = Util.Sphere(5, 4, 4);
const handGeometry = Util.Sphere(5, 4, 4);
const legGeometry = Util.Sphere(5, 4, 4);
const footGeometry = Util.Sphere(6, 4, 4);

const material = Util.Material(0x000000);

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
    let stepFactor = 0.2;
    let running = false;
    let leftBase = 0.05;
    let rightBase = -0.05;
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

    head.position.y = 0;
    head.position.y = 30;

    mesh.add(head);
    mesh.add(body);
    mesh.add(armLeft);
    mesh.add(armRight);
    mesh.add(legLeft);
    mesh.add(legRight);

    mesh.position.set(0, 46, 1000);
    mesh.castShadow = true;
    scene.add(mesh);

    mesh.walk = (impulse) => {
        // rotate
        const angle = Math.atan2(impulse.x, impulse.z);
        let diff = angle - mesh.rotation.y;

        if (Math.abs(diff) > Math.PI) {
            mesh.rotation.y = angle;
            diff = angle - mesh.rotation.y;
        }

        if (diff !== 0) {
            mesh.rotation.y = angle;
        }

        step += stepFactor;

        legLeft.rotateX(dir * leftBase);
        legRight.rotateX(dir * rightBase);
        armLeft.rotateX(leftBase * dir);
        armRight.rotateX(rightBase * dir);

        if (step >= stepFactor * 10) {
            round++;
            step = 0;
            dir = dir == 1 ? -1 : 1;
            if (round % 2 == 0) {
                let tmp = leftBase;
                leftBase = rightBase;
                rightBase = tmp;
            }
        }
    };

    mesh.run = isRunning => {
        if (!isRunning && running) {
            head.position.z = 0;
            head.position.y = 30;
            body.position.z = 0;
            armLeft.position.z = 0;
            armRight.position.z = 0;
            body.rotation.x = -0.08;
            stepFactor = 0.2;
            leftBase = leftBase < 0 ? -0.05 : 0.05;
            rightBase = rightBase < 0 ? -0.05 : 0.05;
            running = false;
        } else if (isRunning && !running) {
            head.position.z = 9;
            head.position.y = 29;
            body.position.z = 5;
            armLeft.position.z = 5;
            armRight.position.z = 5;
            body.rotation.x = 0.3;
            stepFactor = 0.5;
            leftBase = leftBase < 0 ? -0.1 : 0.1;
            rightBase = rightBase < 0 ? -0.1 : 0.1;
            running = true;
        }
    };

    return mesh;
}