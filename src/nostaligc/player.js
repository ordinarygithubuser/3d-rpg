import * as Util from './util';
import PlayerMesh from './player/mesh';
import RayCaster from './player/raycaster';

const Entity = mesh => {
    return  {
        mesh,
        speed: 5,
        onSlope: false,
        grounded: false,
        jumping: false
    };
};

export default (scene, camera) => {
    const mesh = PlayerMesh(scene);
    const entity = Entity(mesh);
    const caster = RayCaster(entity, scene);
    let jumpPhase = 0;

    const setPosition = (target, source, { x = 0, y = 0, z = 0 }, neg) => {
        target.position.x = source.position.x + x;
        target.position.y = source.position.y + y;
        if (neg) target.position.z = source.position.z - z;
        else target.position.z = source.position.z + z;
    };

    entity.jump = () => {
        if (entity.grounded) {
            entity.jumping = true;
            entity.onSlope = false;
            entity.grounded = false;
        }
    };

    entity.run = (isRunning) => {
        if (isRunning) {
            entity.speed = 10;
        } else {
            entity.speed = 5;
        }
        mesh.run(isRunning);
    };

    entity.move = impulse => {
        if (impulse.x != 0 || impulse.z != 0) {
            mesh.walk(impulse);
        }

        impulse = caster.collide(impulse);

        if (entity.jumping) {
            if (jumpPhase < 15) {
                impulse.y = 8;
                jumpPhase++;
            } else {
                jumpPhase = 0;
                entity.jumping = false;
            }
        } else if (entity.onSlope) {
            impulse.y -= entity.speed / 2;
        } else if (!entity.grounded) {
            const diff = mesh.position.y - 5;
            impulse.y -= diff < 5 ? diff : 5;
        }

        setPosition(mesh, mesh, impulse);
        setPosition(camera, mesh, impulse, true);
    };

    entity.rotate = (acc) => {
        camera.rotation.y += acc / 25;
    };

    return entity;
};