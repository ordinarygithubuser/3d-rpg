import * as Util from './util';

const rotationAngle = 0.04;

export default (scene, player) => {
    let gamepad = null;

    const handleGamepad = () => {

    };

    const update = () => {
        gamepad = navigator.getGamepads()[0];

        if (!gamepad) return;

        const impulse = new Util.Vector(0, 0, 0);

        if (gamepad.buttons[0].pressed) { // A
            player.use('A');
        } else if (gamepad.buttons[1].pressed) { // B
            player.use('B');
        } else if (gamepad.buttons[2].pressed) { // X
            player.use('X');
        } else if (gamepad.buttons[3].pressed) { // Y
            player.jump();
        }

        if (gamepad.buttons[4].pressed) { // L
            player.rotate(rotationAngle);
        } else if (gamepad.buttons[5].pressed) { // R
            player.rotate(-rotationAngle);
        }

        if (gamepad.axes[0] < -0.5) impulse.x = -player.speed;
        else if (gamepad.axes[0] > 0.5) impulse.x = player.speed;

        if (gamepad.axes[1] > 0.5) impulse.z = player.speed;
        else if (gamepad.axes[1] < -0.5) impulse.z = -player.speed;

        player.move(impulse);
    };

    return { update };
}