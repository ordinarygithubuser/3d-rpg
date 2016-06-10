import * as Util from '../util';

export default (entity, scene) => {
    const caster = Util.RayCaster();
    const rays = [
        Util.Vector(0, -1, 0),    // down
        Util.Vector(0, 0, 1),    // forward
        Util.Vector(0, 0, -1),   // backward
        Util.Vector(1, 0, 0),    // left
        Util.Vector(-1, 0, 0)    // right
    ];

    const collide = impulse => {
        rays.map((ray, i) => {
            caster.set(entity.mesh.position, ray);
            const collisions = caster.intersectObjects(scene.obstacles);
            const collision = collisions.length > 0 ? collisions[0]: null;
            const inReach = collision && collision.distance < 48;

            if (collision && inReach) {
                entity.onSlope = collision.object.slope;

                if (i == 0) {
                    entity.grounded = true;
                    if (collision.point.y > entity.mesh.position.y - 46) {
                        entity.mesh.position.y = collision.point.y + 46;
                    }
                    if (entity.onSlope) {

                    }
                }

                if (i == 1 && impulse.z > 0) impulse.z = 0;
                if (i == 2 && impulse.z < 0) impulse.z = 0;
                if (i == 3 && impulse.x > 0) impulse.x = 0;
                if (i == 4 && impulse.x < 0) impulse.x = 0;
            } else if (collision && i == 0) {
                entity.grounded = false;
            }
        });
        return impulse;
    };

    return { collide };
}