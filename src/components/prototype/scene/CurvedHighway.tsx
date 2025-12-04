import React, { useMemo } from 'react';
import * as THREE from 'three';

type Props = {
    path: THREE.CatmullRomCurve3;
};

export default function CurvedHighway({ path }: Props) {
    const roadMeshes = useMemo(() => {
        const meshes: { position: THREE.Vector3; rotation: number }[] = [];
        const segments = 200;

        for (let i = 0; i < segments; i++) {
            const t1 = i / segments;
            const t2 = (i + 1) / segments;

            const p1 = path.getPointAt(t1);
            const p2 = path.getPointAt(t2);
            const tangent = path.getTangentAt(t1);

            meshes.push({
                position: p1.clone().add(p2).multiplyScalar(0.5),
                rotation: Math.atan2(tangent.x, tangent.z),
            });
        }

        return meshes;
    }, [path]);

    return (
        <group>
            {roadMeshes.map((mesh, i) => (
                <group key={i} position={mesh.position} rotation={[0, mesh.rotation, 0]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                        <planeGeometry args={[18, 1.5]} />
                        <meshStandardMaterial color="#2a2a2a" />
                    </mesh>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]}>
                        <planeGeometry args={[0.3, 1.5]} />
                        <meshStandardMaterial color="yellow" />
                    </mesh>
                </group>
            ))}
        </group>
    );
}
