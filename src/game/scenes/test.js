import N from '../../nostaligc/nostalgic';

export default class Test extends N.Scene {
    setupLights () {
        const ambient = N.AmbientLight(0xa0a0a0);
        const point = N.PointLight(0xfefe4f, 2, 2000);
        const sbox = N.Sunset();

        var theta = Math.PI * (sbox.sky.uniforms.inclination.value - 0.5);
        var phi = 2 * Math.PI * (sbox.sky.uniforms.azimuth.value - 0.5);

        sbox.sun.position.x = Math.round(4000 * Math.cos(phi));
        sbox.sun.position.y = Math.round(4000 * Math.sin(phi) * Math.sin(theta));
        sbox.sun.position.z = Math.round(4000 * Math.sin(phi) * Math.cos(theta));
        sbox.sun.visible = false;
        sbox.sky.uniforms.sunPosition.value.copy(sbox.sun.position);

        return [ ambient, point, sbox ];
    }

    setupObstacles () {
        const stage = N.Mesh(N.Plane(1200, 3000, true), N.Material(0xffffff), true);
        const plane = N.Mesh(N.Box(100, 4, 210), N.Material(0x00ff00));
        const box1 = N.Mesh(N.Box(350, 80, 490), N.Material(0xdd0f0d));
        const box2 = N.Mesh(N.Box(-350, 20, 490), N.Material(0x0a0ffd));
        const ramp1 = N.Mesh(N.Plane(300, 390), N.Material(0xdd0f0d), true, true);
        const ramp2 = N.Mesh(N.Plane(350, 450), N.Material(0xdd0f0d), false, true);

        stage.position.y = 0;
        plane.position.set(120, 80, 10);
        box1.position.set(-290, 40, 400);
        box2.position.set(290, 20, 0);
        ramp1.position.set(25, 30, 400);
        ramp1.rotateY(0.345);
        ramp2.position.set(-290, 0, -54);
        ramp2.rotateX(-Math.PI / 1.62);

        return [ stage, plane, box1, box2, ramp1, ramp2 ];
    }

    update () {
        this.lights.map(light => {

        });
    };
};