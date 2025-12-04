import * as THREE from 'three';

export function createHighwayPath() {
    const points: THREE.Vector3[] = [];
    const segments = 100;

    for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const z = t * 200 - 100;
        const x = Math.sin(t * Math.PI * 2) * 15;
        points.push(new THREE.Vector3(x, 0, z));
    }

    return new THREE.CatmullRomCurve3(points);
}