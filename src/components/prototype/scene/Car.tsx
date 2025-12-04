import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import type { GLTFLoader } from 'three-stdlib';
import * as THREE from 'three';
import type { ControlMode } from '../types';

type Props = {
    carRef?: React.RefObject<THREE.Group | null>;
    offset?: number;
    path: THREE.CatmullRomCurve3;
    baseSpeed?: number;
    controlMode: ControlMode;
    laneOffset?: number;
    shouldStop?: boolean;
    isPaused?: boolean;
};

const enforceTextureLoader = (loader: GLTFLoader) => {
    const texturedLoader = loader as GLTFLoader & {
        textureLoader?: THREE.TextureLoader;
    };
    texturedLoader.textureLoader = new THREE.TextureLoader(loader.manager);
    texturedLoader.textureLoader.setCrossOrigin('anonymous');
    texturedLoader.textureLoader.setRequestHeader(loader.requestHeader ?? {});
};

export default function Car({
                                carRef,
                                offset = 0,
                                path,
                                baseSpeed = 2,
                                controlMode,
                                laneOffset = 0,
                                shouldStop = false,
                                isPaused = false,
                            }: Props) {
    const { scene } = useGLTF('/models/car.glb', undefined, undefined, enforceTextureLoader);
    const wheelTexture = useTexture('/models/textures/tire-basecolor.png');

    useEffect(() => {
        wheelTexture.colorSpace = THREE.SRGBColorSpace;
        wheelTexture.flipY = false;
        wheelTexture.anisotropy = 8;
        wheelTexture.needsUpdate = true;
    }, [wheelTexture]);

    const localRef = useRef<THREE.Group>(null);
    const ref = carRef || localRef;
    const progressRef = useRef(offset);
    const initializedRef = useRef(false);
    const currentSpeedRef = useRef(baseSpeed);

    const processedScene = useMemo(() => {
        const clonedScene = scene.clone(true);

        const shouldOverrideWheelMaterial = (mesh: THREE.Mesh) => {
            const meshName = mesh.name?.toLowerCase() ?? '';
            return meshName.includes('tire') || meshName.includes('wheel');
        };

        clonedScene.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return;
            if (!shouldOverrideWheelMaterial(child)) return;

            const applyWheelMaterial = (material: THREE.Material | undefined) => {
                if (!material || !(material instanceof THREE.MeshStandardMaterial)) return material;
                const wheelMaterial = material.clone();
                wheelMaterial.map = wheelTexture;
                wheelMaterial.color = new THREE.Color(0xffffff);
                wheelMaterial.roughness = 0.85;
                wheelMaterial.metalness = 0.15;
                wheelMaterial.needsUpdate = true;
                return wheelMaterial;
            };

            if (Array.isArray(child.material)) {
                child.material = child.material.map((mat) => applyWheelMaterial(mat) ?? mat);
            } else {
                child.material = applyWheelMaterial(child.material) ?? child.material;
            }
        });

        return clonedScene;
    }, [scene, wheelTexture]);

    useFrame((_, delta) => {
        if (!ref.current) return;

        // Initialize position on first frame
        if (!initializedRef.current) {
            const point = path.getPointAt(progressRef.current);
            const tangent = path.getTangentAt(progressRef.current);
            const perpendicular = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
            const lanePosition = point.clone().add(perpendicular.multiplyScalar(laneOffset));

            ref.current.position.copy(lanePosition);
            ref.current.position.y = 0.3;
            const angle = Math.atan2(tangent.x, tangent.z);
            ref.current.rotation.y = angle;
            initializedRef.current = true;
        }

        if (isPaused) return;

        // Stopping behavior
        if (shouldStop) {
            currentSpeedRef.current = Math.max(currentSpeedRef.current - delta * 5, 0);
        } else {
            currentSpeedRef.current = Math.min(currentSpeedRef.current + delta * 2, baseSpeed);
        }

        progressRef.current += delta * currentSpeedRef.current * 0.01;

        if (progressRef.current > 1) progressRef.current -= 1;
        if (progressRef.current < 0) progressRef.current += 1;

        const point = path.getPointAt(progressRef.current);
        const tangent = path.getTangentAt(progressRef.current);
        const perpendicular = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        const lanePosition = point.clone().add(perpendicular.multiplyScalar(laneOffset));

        ref.current.position.copy(lanePosition);
        ref.current.position.y = 0.3;

        const angle = Math.atan2(tangent.x, tangent.z);
        ref.current.rotation.y = angle;

        // Visual indicator based on control mode
        const child = ref.current.children[0] as THREE.Mesh;
        const material = child?.material as THREE.MeshStandardMaterial;
        if (material && material.emissive) {
            if (controlMode === 'hdfs') {
                material.emissive = new THREE.Color(0x00ff00);
                material.emissiveIntensity = 0.3;
            } else if (controlMode === 'transitioning') {
                material.emissive = new THREE.Color(0xffff00);
                material.emissiveIntensity = 0.5;
            } else {
                material.emissive = new THREE.Color(0x000000);
                material.emissiveIntensity = 0;
            }
        }
    });

    return <primitive ref={ref} object={processedScene} scale={1} />;
}

useGLTF.preload('/models/car.glb', undefined, undefined, enforceTextureLoader);
useTexture.preload('/models/textures/tire-basecolor.png');
