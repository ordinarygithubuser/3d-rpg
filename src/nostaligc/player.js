import * as Util from './util';
import PlayerMesh from './player/mesh';
import RayCaster from './player/raycaster';

import Sword from './item/sword-l1';

const UP = Util.Vector(0, 1, 0);

const Entity = mesh => {
    return  {
        mesh,
        speed: 10,
        onSlope: false,
        grounded: false,
        jumping: false,
        rotation: 0
    };
};

export default (scene, camera) => {
    const tools = [];
    let tool = null;

    const mesh = PlayerMesh(scene);
    const entity = Entity(mesh);
    const caster = RayCaster(entity, scene);
    let processInput = true;
    let jumpPhase = 0;

    const setPosition = (target, source, { x = 0, y = 0, z = 0 }) => {
        target.position.x = source.position.x + x;
        target.position.y = source.position.y + y;
        target.position.z = source.position.z + z;
    };

    const equipArmor = () => {

    };

    entity.enable = () => {
        processInput = true;
    };

    entity.disable = () => {
        processInput = false;
    };

    entity.jump = () => {
        if (processInput && entity.grounded) {
            entity.jumping = true;
            entity.onSlope = false;
            entity.grounded = false;
        }
    };

    entity.move = impulse => {
        if (!processInput) return;

        impulse.applyAxisAngle(UP, entity.rotation);

        if (impulse.x != 0 || impulse.z != 0) {
            mesh.walk(impulse);
        } else {
            mesh.stop();
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
        impulse.y += 86;
        setPosition(camera, mesh, impulse);
    };

    entity.equip = (item, button) => {
        if (!processInput) return;

        if (item.type == 'tool') {
            if (tool) mesh.remove(tool);

            tools[button] = item;
            tool = item;
            mesh.equipTool(tool);
        }
    };

    entity.use = button => {
        if (!processInput) return;

        if (button == 'B') {

        } else if (tool != tools[button]) {
            entity.equip(tools[button], button);
        }
        if (tool) {
            mesh.equipTool(tool);
            tool.use(entity);
        }
    };

    entity.rotate = angle => {
        entity.rotation += angle;
        camera.rotateY(angle);
    };

    entity.equip(Sword(), 'A');
    entity.move(Util.Vector(0, 0, 0));

    return entity;
};