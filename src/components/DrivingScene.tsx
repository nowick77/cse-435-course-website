'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, createContext, useContext, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

const CarsContext = createContext<{
    cars: Map<string, { position: THREE.Vector3; laneOffset: number }>;
    updateCar: (id: string, position: THREE.Vector3, laneOffset: number) => void;
}>({
    cars: new Map(),
    updateCar: () => {},
});

function createHighwayPath() {
    const points = [];
    const segments = 100;

    for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const z = t * 200 - 100;
        const x = Math.sin(t * Math.PI * 2) * 15;
        points.push(new THREE.Vector3(x, 0, z));
    }

    return new THREE.CatmullRomCurve3(points);
}

function Car({ carRef, offset = 0, speed = 2, laneOffset = 0, path, id }: {
    carRef?: React.RefObject<THREE.Group | null>,
    offset?: number,
    speed?: number,
    laneOffset?: number,
    path: THREE.CatmullRomCurve3,
    id: string
}) {
    const { scene } = useGLTF('/models/car.glb');
    const localRef = useRef<THREE.Group>(null);
    const ref = carRef || localRef;
    const progressRef = useRef(offset);
    const currentSpeedRef = useRef(speed);
    const { cars, updateCar } = useContext(CarsContext);

    useFrame((state, delta) => {
        if (ref.current) {
            let carAhead = false;

            cars.forEach((carData, carId) => {
                if (carId !== id && Math.abs(carData.laneOffset - laneOffset) < 2) {
                    const distance = ref.current!.position.distanceTo(carData.position);
                    const ahead = carData.position.z > ref.current!.position.z;

                    if (ahead && distance < 10) {
                        carAhead = true;
                    }
                }
            });

            if (carAhead) {
                currentSpeedRef.current = Math.max(currentSpeedRef.current - delta * 2, speed * 0.3);
            } else {
                currentSpeedRef.current = Math.min(currentSpeedRef.current + delta * 1, speed);
            }

            progressRef.current += delta * currentSpeedRef.current * 0.01;

            if (progressRef.current > 1) progressRef.current -= 1;
            if (progressRef.current < 0) progressRef.current += 1;

            const point = path.getPointAt(progressRef.current);
            const tangent = path.getTangentAt(progressRef.current);
            const perpendicular = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
            const lanePosition = point.clone().add(perpendicular.multiplyScalar(laneOffset));

            ref.current.position.copy(lanePosition);
            updateCar(id, ref.current.position.clone(), laneOffset);

            const angle = Math.atan2(tangent.x, tangent.z);
            ref.current.rotation.y = angle;
        }
    });

    return <primitive ref={ref} object={scene.clone()} scale={1} position={[0, 0.3, 0]} />;
}

function CurvedHighway({ path }: { path: THREE.CatmullRomCurve3 }) {
    const roadMeshes = useMemo(() => {
        const meshes = [];
        const segments = 200;

        for (let i = 0; i < segments; i++) {
            const t1 = i / segments;
            const t2 = (i + 1) / segments;

            const p1 = path.getPointAt(t1);
            const p2 = path.getPointAt(t2);
            const tangent = path.getTangentAt(t1);

            const perpendicular = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

            meshes.push({
                position: p1.clone().add(p2).multiplyScalar(0.5),
                rotation: Math.atan2(tangent.x, tangent.z),
                perpendicular: perpendicular
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

                    {i % 3 === 0 && (
                        <>
                            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, -0.49, 0]}>
                                <planeGeometry args={[0.15, 0.8]} />
                                <meshStandardMaterial color="white" />
                            </mesh>
                            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6, -0.49, 0]}>
                                <planeGeometry args={[0.15, 0.8]} />
                                <meshStandardMaterial color="white" />
                            </mesh>
                            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3, -0.49, 0]}>
                                <planeGeometry args={[0.15, 0.8]} />
                                <meshStandardMaterial color="white" />
                            </mesh>
                            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-6, -0.49, 0]}>
                                <planeGeometry args={[0.15, 0.8]} />
                                <meshStandardMaterial color="white" />
                            </mesh>
                        </>
                    )}

                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[9, -0.49, 0]}>
                        <planeGeometry args={[0.3, 1.5]} />
                        <meshStandardMaterial color="white" />
                    </mesh>

                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-9, -0.49, 0]}>
                        <planeGeometry args={[0.3, 1.5]} />
                        <meshStandardMaterial color="white" />
                    </mesh>

                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[11.5, -0.5, 0]}>
                        <planeGeometry args={[5, 1.5]} />
                        <meshStandardMaterial color="#4a4a4a" />
                    </mesh>

                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-11.5, -0.5, 0]}>
                        <planeGeometry args={[5, 1.5]} />
                        <meshStandardMaterial color="#4a4a4a" />
                    </mesh>

                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-18, -0.51, 0]}>
                        <planeGeometry args={[14, 1.5]} />
                        <meshStandardMaterial color="#1a3d1a" />
                    </mesh>

                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[18, -0.51, 0]}>
                        <planeGeometry args={[14, 1.5]} />
                        <meshStandardMaterial color="#1a3d1a" />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

function CameraRig({ carRef }: { carRef: React.RefObject<THREE.Group | null> }) {
    useFrame((state) => {
        if (carRef.current) {
            const carPosition = carRef.current.position;
            const carRotation = carRef.current.rotation;

            const behindOffset = new THREE.Vector3(0, 0, -8);
            behindOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), carRotation.y);

            const targetPosition = new THREE.Vector3(
                carPosition.x + behindOffset.x,
                carPosition.y + 5,
                carPosition.z + behindOffset.z
            );

            state.camera.position.lerp(targetPosition, 0.1);
            state.camera.lookAt(carPosition.x, carPosition.y + 1, carPosition.z);
        }
    });
    return null;
}

function CarsProvider({ children }: { children: React.ReactNode }) {
    const [cars] = useState(() => new Map<string, { position: THREE.Vector3; laneOffset: number }>());

    const updateCar = (id: string, position: THREE.Vector3, laneOffset: number) => {
        cars.set(id, { position, laneOffset });
    };

    return (
        <CarsContext.Provider value={{ cars, updateCar }}>
            {children}
        </CarsContext.Provider>
    );
}

export default function DrivingScene() {
    const playerCarRef = useRef<THREE.Group>(null);
    const path = useMemo(() => createHighwayPath(), []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
        }}>
            <Canvas style={{ width: '100%', height: '100%' }}>
                <CarsProvider>
                    <PerspectiveCamera makeDefault position={[0, 5, 8]} />
                    <CameraRig carRef={playerCarRef} />

                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <fog attach="fog" args={['#87CEEB', 30, 80]} />

                    <Car carRef={playerCarRef} offset={0} speed={3} laneOffset={7.5} path={path} id="player" />

                    <Car offset={0.1} speed={2.2} laneOffset={1.5} path={path} id="car1" />
                    <Car offset={0.25} speed={3.2} laneOffset={4.5} path={path} id="car2" />
                    <Car offset={0.4} speed={2.5} laneOffset={1.5} path={path} id="car3" />
                    <Car offset={0.55} speed={2.8} laneOffset={4.5} path={path} id="car4" />
                    <Car offset={0.7} speed={2.0} laneOffset={7.5} path={path} id="car5" />
                    <Car offset={0.85} speed={3.5} laneOffset={1.5} path={path} id="car6" />

                    <CurvedHighway path={path} />

                    <Environment preset="sunset" />
                </CarsProvider>
            </Canvas>
        </div>
    );
}