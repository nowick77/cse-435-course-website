import React from 'react';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import type { ControlMode } from '../types';
import Car from './Car';
import CurvedHighway from './CurvedHighway';
import CameraRig from './CameraRig';

type Props = {
    playerCarRef: React.RefObject<THREE.Group | null>;
    path: THREE.CatmullRomCurve3;
    controlMode: ControlMode;
    shouldStop: boolean;
    isPaused: boolean;
};

const Scene = React.memo(
    ({ playerCarRef, path, controlMode, shouldStop, isPaused }: Props) => {
        return (
            <>
                <PerspectiveCamera makeDefault position={[0, 5, 8]} />
                <CameraRig carRef={playerCarRef} />

                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <fog attach="fog" args={['#87CEEB', 30, 80]} />

                <Car
                    carRef={playerCarRef}
                    offset={0}
                    path={path}
                    baseSpeed={3}
                    controlMode={controlMode}
                    laneOffset={6}
                    shouldStop={shouldStop}
                    isPaused={isPaused}
                />

                <CurvedHighway path={path} />

                <Environment preset="sunset" />
            </>
        );
    },
    (prev, next) =>
        prev.controlMode === next.controlMode &&
        prev.shouldStop === next.shouldStop &&
        prev.isPaused === next.isPaused &&
        prev.path === next.path &&
        prev.playerCarRef === next.playerCarRef
);

Scene.displayName = 'Scene';

export default Scene;
