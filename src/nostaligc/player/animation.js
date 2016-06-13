export const stand = entity => {
    entity.head.position.z = 0;
    entity.head.position.y = 30;
    entity.body.position.z = 0;
    entity.arms[0].position.z = 0;
    entity.arms[1].position.z = 0;
    entity.body.rotation.x = -0.08;
    entity.legs[0].rotation.x = 0;
    entity.legs[1].rotation.x = 0;
    entity.arms[0].rotation.x = 0;
    entity.arms[1].rotation.x = 0;
    entity.running = false;
};

export const walk = entity => {
    entity.head.position.z = 9;
    entity.head.position.y = 29;
    entity.body.position.z = 5;
    entity.arms[0].position.z = 5;
    entity.arms[1].position.z = 5;
    entity.body.rotation.x = 0.3;
    entity.running = true;
};

export const turn = (mesh, impulse) => {
    const angle = Math.atan2(impulse.x, impulse.z);
    let diff = angle - mesh.rotation.y;

    if (Math.abs(diff) > Math.PI) {
        mesh.rotation.y = angle;
        diff = angle - mesh.rotation.y;
    }

    if (diff !== 0) {
        mesh.rotation.y = angle;
    }
};