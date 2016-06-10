import * as Util from './util';

const hitMaterial = Util.Material(0xff0000, 0.6, true);
const hitGeometry = Util.Box(5, 5, 5);

export default (scene, player) => {
    let gamepad = null;
    let hitBox = null;

    const controls = {
        hit: false
    };

    const handleGamepad = () => {
        gamepad = navigator.getGamepads()[0];

        if (gamepad) {
            const impulse = new Util.Vector(0, 0, 0);

            if (gamepad.buttons[0].pressed) { // A
                controls.hit = true;
            }

            if (gamepad.buttons[1].pressed) { // B
                player.run(true);
            } else {
                player.run(false);
            }

            if (gamepad.buttons[2].pressed) { // X

            } else if (gamepad.buttons[3].pressed) { // Y
                player.jump();
            }

            if (gamepad.buttons[4].pressed) { // L
                player.rotate(1.5);
            } else if (gamepad.buttons[5].pressed) { // R
                player.rotate(-1.5);
            }

            if (gamepad.axes[0] < -0.5) impulse.x = -player.speed;
            else if (gamepad.axes[0] > 0.5) impulse.x = player.speed;

            if (gamepad.axes[1] > 0.5) impulse.z = player.speed;
            else if (gamepad.axes[1] < -0.5) impulse.z = -player.speed;

            player.move(impulse);
        }
    };

    const handleHit = () => {
        if (controls.hit && !hitBox) {
            //hitBox = new THREE.Mesh(hitGeometry, hitMaterial);
            //hitBox.position.x = player.position.x + 3;
            //hitBox.position.y = player.position.y + 2;
            //scene.add(hitBox);
            controls.hit = false;
        } else if (hitBox) {
            scene.remove(hitBox);
            hitBox = null;
        }
    };

    const update = () => {
        handleGamepad();
        handleHit();
    };

    return { update };
}