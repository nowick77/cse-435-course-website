import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Props = {
    carRef: React.RefObject<THREE.Group | null>;
};

export default function CameraRig({ carRef }: Props) {
    const targetPositionRef = useRef(new THREE.Vector3(0, 5, 8));
    const targetLookAtRef = useRef(new THREE.Vector3(0, 1, 0));

    useFrame((state) => {
        if (!carRef.current) return;

        const carPosition = carRef.current.position;
        const carRotation = carRef.current.rotation;

        const behindOffset = new THREE.Vector3(0, 0, -8);
        behindOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), carRotation.y);

        const newTargetPosition = new THREE.Vector3(
            carPosition.x + behindOffset.x,
            carPosition.y + 5,
            carPosition.z + behindOffset.z
        );

        const newTargetLookAt = new THREE.Vector3(
            carPosition.x,
            carPosition.y + 1,
            carPosition.z
        );

        targetPositionRef.current.lerp(newTargetPosition, 0.05);
        targetLookAtRef.current.lerp(newTargetLookAt, 0.05);

        state.camera.position.lerp(targetPositionRef.current, 0.1);
        state.camera.lookAt(targetLookAtRef.current);
    });

    return null;
}

