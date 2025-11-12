'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type ScenarioId = 'scenario1' | 'scenario2' | 'scenario3' | 'scenario4' | 'scenario5';

interface SystemStatus {
    hdfsActive: boolean;
    radarStatus: 'operational' | 'fault';
    cameraStatus: 'operational' | 'fault';
    gpsStatus: 'operational' | 'fault';
    mappingStatus: 'operational' | 'construction' | 'unavailable';
    driverAttentionLevel: number; // 0-100
    controlMode: 'driver' | 'hdfs' | 'transitioning';
    securityStatus: 'secure' | 'unauthorized_attempt' | 'compromised';
}

interface ScenarioConfig {
    id: ScenarioId;
    name: string;
    description: string;
    systemStatus: SystemStatus;
    events: ScenarioEvent[];
}

interface ScenarioEvent {
    time: number; // seconds into scenario
    type: string;
    action: (status: SystemStatus) => void;
    message: string;
}

// ============================================================================
// SCENARIO DEFINITIONS
// ============================================================================

const scenarios: ScenarioConfig[] = [
    {
        id: 'scenario1',
        name: 'Scenario 1: Normal Operation with Driver Attention Monitoring',
        description: 'System fully operational. Driver activates HDFS on supported highway. Driver Attention System monitors engagement.',
        systemStatus: {
            hdfsActive: false,
            radarStatus: 'operational',
            cameraStatus: 'operational',
            gpsStatus: 'operational',
            mappingStatus: 'operational',
            driverAttentionLevel: 100,
            controlMode: 'driver',
            securityStatus: 'secure',
        },
        events: [
            {
                time: 2,
                type: 'system_check',
                message: 'All systems operational. HDFS ready for activation.',
                action: () => {},
            },
            {
                time: 4,
                type: 'hdfs_activation',
                message: 'Driver activating HDFS... System engaged.',
                action: (status) => {
                    status.hdfsActive = true;
                    status.controlMode = 'hdfs';
                },
            },
            {
                time: 8,
                type: 'attention_check',
                message: 'Driver Attention: Excellent (100%)',
                action: (status) => {
                    status.driverAttentionLevel = 100;
                },
            },
            {
                time: 12,
                type: 'attention_warning_1',
                message: '⚠️ Driver Attention Level decreasing (70%)',
                action: (status) => {
                    status.driverAttentionLevel = 70;
                },
            },
            {
                time: 16,
                type: 'attention_warning_2',
                message: '⚠️⚠️ WARNING: Low driver attention (40%). Please focus on the road.',
                action: (status) => {
                    status.driverAttentionLevel = 40;
                },
            },
            {
                time: 20,
                type: 'attention_restored',
                message: '✓ Driver attention restored (100%)',
                action: (status) => {
                    status.driverAttentionLevel = 100;
                },
            },
        ],
    },
    {
        id: 'scenario2',
        name: 'Scenario 2: System Failure & Fail-Safe Mode',
        description: 'Demonstrates sensor failure and system fail-safe response. Construction zone detected without mapping data.',
        systemStatus: {
            hdfsActive: true,
            radarStatus: 'operational',
            cameraStatus: 'operational',
            gpsStatus: 'operational',
            mappingStatus: 'operational',
            driverAttentionLevel: 100,
            controlMode: 'hdfs',
            securityStatus: 'secure',
        },
        events: [
            {
                time: 2,
                type: 'normal_operation',
                message: 'HDFS engaged. All systems operational.',
                action: () => {},
            },
            {
                time: 6,
                type: 'mapping_failure',
                message: '⚠️ Construction zone detected. Mapping data unavailable.',
                action: (status) => {
                    status.mappingStatus = 'construction';
                },
            },
            {
                time: 8,
                type: 'radar_fault',
                message: '🚨 RADAR SENSOR FAULT DETECTED',
                action: (status) => {
                    status.radarStatus = 'fault';
                },
            },
            {
                time: 10,
                type: 'fail_safe_warning',
                message: '🚨 CRITICAL: Multiple system failures. Initiating fail-safe protocol.',
                action: () => {},
            },
            {
                time: 12,
                type: 'transition_to_driver',
                message: '🚨 TAKE OVER NOW: Transferring control to driver. Reducing speed.',
                action: (status) => {
                    status.controlMode = 'transitioning';
                },
            },
            {
                time: 15,
                type: 'driver_control',
                message: '✓ Driver control restored. HDFS disengaged. Pull over safely when possible.',
                action: (status) => {
                    status.hdfsActive = false;
                    status.controlMode = 'driver';
                },
            },
        ],
    },
    {
        id: 'scenario3',
        name: 'Scenario 3: Continuous Driver Disengagement',
        description: 'Driver becomes permanently disengaged while HDFS is active. System escalates warnings and takes protective action.',
        systemStatus: {
            hdfsActive: true,
            radarStatus: 'operational',
            cameraStatus: 'operational',
            gpsStatus: 'operational',
            mappingStatus: 'operational',
            driverAttentionLevel: 100,
            controlMode: 'hdfs',
            securityStatus: 'secure',
        },
        events: [
            {
                time: 2,
                type: 'normal_operation',
                message: 'HDFS engaged. Driver attention: Good',
                action: () => {},
            },
            {
                time: 5,
                type: 'attention_drop_1',
                message: '⚠️ Driver attention decreasing (60%)',
                action: (status) => {
                    status.driverAttentionLevel = 60;
                },
            },
            {
                time: 8,
                type: 'attention_drop_2',
                message: '⚠️⚠️ WARNING: Low attention (30%). Visual and audio alerts active.',
                action: (status) => {
                    status.driverAttentionLevel = 30;
                },
            },
            {
                time: 11,
                type: 'attention_critical',
                message: '🚨 CRITICAL: No driver response (10%). Hands not detected on wheel.',
                action: (status) => {
                    status.driverAttentionLevel = 10;
                },
            },
            {
                time: 14,
                type: 'emergency_protocol',
                message: '🚨 EMERGENCY: Driver unresponsive. Activating emergency protocol.',
                action: (status) => {
                    status.driverAttentionLevel = 0;
                },
            },
            {
                time: 16,
                type: 'emergency_stop',
                message: '🚨 Reducing speed. Activating hazard lights. Moving to shoulder.',
                action: (status) => {
                    status.controlMode = 'hdfs';
                    status.driverAttentionLevel = 0;
                },
            },
            {
                time: 20,
                type: 'stop_complete',
                message: '🚨 Vehicle stopped safely. Emergency services notified. Hazards active.',
                action: (status) => {
                    status.hdfsActive = false;
                    status.driverAttentionLevel = 0;
                },
            },
        ],
    },
    {
        id: 'scenario4',
        name: 'Scenario 4: Control Transfer Between Driver & HDFS',
        description: 'Demonstrates smooth transitions of control between driver and HDFS system.',
        systemStatus: {
            hdfsActive: false,
            radarStatus: 'operational',
            cameraStatus: 'operational',
            gpsStatus: 'operational',
            mappingStatus: 'operational',
            driverAttentionLevel: 100,
            controlMode: 'driver',
            securityStatus: 'secure',
        },
        events: [
            {
                time: 2,
                type: 'driver_control',
                message: 'Driver in full control. Highway conditions suitable for HDFS.',
                action: () => {},
            },
            {
                time: 5,
                type: 'driver_activates',
                message: '→ Driver activating HDFS. Transferring control...',
                action: (status) => {
                    status.controlMode = 'transitioning';
                },
            },
            {
                time: 7,
                type: 'hdfs_active',
                message: '✓ HDFS engaged. System in control. Driver monitoring required.',
                action: (status) => {
                    status.hdfsActive = true;
                    status.controlMode = 'hdfs';
                },
            },
            {
                time: 11,
                type: 'driver_intervention',
                message: '← Driver steering input detected. Transitioning to manual control...',
                action: (status) => {
                    status.controlMode = 'transitioning';
                },
            },
            {
                time: 13,
                type: 'manual_control',
                message: '✓ Driver in control. HDFS on standby.',
                action: (status) => {
                    status.hdfsActive = false;
                    status.controlMode = 'driver';
                },
            },
            {
                time: 17,
                type: 'reactivate_hdfs',
                message: '→ Driver reactivating HDFS...',
                action: (status) => {
                    status.controlMode = 'transitioning';
                },
            },
            {
                time: 19,
                type: 'hdfs_reengaged',
                message: '✓ HDFS re-engaged successfully.',
                action: (status) => {
                    status.hdfsActive = true;
                    status.controlMode = 'hdfs';
                },
            },
        ],
    },
    {
        id: 'scenario5',
        name: 'Scenario 5: System Security & Authorization',
        description: 'Demonstrates security measures preventing unauthorized commands to Vehicle Control System.',
        systemStatus: {
            hdfsActive: true,
            radarStatus: 'operational',
            cameraStatus: 'operational',
            gpsStatus: 'operational',
            mappingStatus: 'operational',
            driverAttentionLevel: 100,
            controlMode: 'hdfs',
            securityStatus: 'secure',
        },
        events: [
            {
                time: 2,
                type: 'secure_operation',
                message: '✓ System secure. Encrypted communication active. Authentication verified.',
                action: () => {},
            },
            {
                time: 5,
                type: 'security_check',
                message: '🔒 Security Check: Digital signature valid. Command origin verified.',
                action: () => {},
            },
            {
                time: 8,
                type: 'unauthorized_attempt',
                message: '🚨 SECURITY ALERT: Unauthorized command detected from external source.',
                action: (status) => {
                    status.securityStatus = 'unauthorized_attempt';
                },
            },
            {
                time: 10,
                type: 'command_rejected',
                message: '🛡️ Command REJECTED. Invalid authentication token. Source: Unknown.',
                action: () => {},
            },
            {
                time: 12,
                type: 'security_log',
                message: '📝 Incident logged. Security team notified. System integrity maintained.',
                action: (status) => {
                    status.securityStatus = 'secure';
                },
            },
            {
                time: 15,
                type: 'intrusion_attempt',
                message: '🚨 CRITICAL: Multiple intrusion attempts detected. CAN bus anomaly.',
                action: (status) => {
                    status.securityStatus = 'compromised';
                },
            },
            {
                time: 17,
                type: 'lockdown',
                message: '🔒 SECURITY LOCKDOWN: Disabling HDFS. Driver control only. Pulling diagnostic data.',
                action: (status) => {
                    status.hdfsActive = false;
                    status.controlMode = 'driver';
                },
            },
            {
                time: 20,
                type: 'secure_restored',
                message: '✓ Security protocols updated. System secured. HDFS will require re-authorization.',
                action: (status) => {
                    status.securityStatus = 'secure';
                },
            },
        ],
    },
];

// ============================================================================
// COMPONENTS
// ============================================================================

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

function Car({
                 carRef,
                 offset = 0,
                 path,
                 baseSpeed = 2,
                 controlMode,
                 laneOffset = 0,
                 shouldStop = false,
                 isPaused = false,
             }: {
    carRef?: React.RefObject<THREE.Group | null>;
    offset?: number;
    path: THREE.CatmullRomCurve3;
    baseSpeed?: number;
    controlMode: 'driver' | 'hdfs' | 'transitioning';
    laneOffset?: number;
    shouldStop?: boolean;
    isPaused?: boolean;
}) {
    const { scene } = useGLTF('/models/car.glb');
    const localRef = useRef<THREE.Group>(null);
    const ref = carRef || localRef;
    const progressRef = useRef(offset);
    const initializedRef = useRef(false);
    const currentSpeedRef = useRef(baseSpeed);

    useFrame((state, delta) => {
        if (ref.current) {
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

            // Don't update if paused
            if (isPaused) return;

            // Handle stopping behavior
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
            const material = (ref.current.children[0] as any)?.material;
            if (material) {
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
        }
    });

    return <primitive ref={ref} object={scene.clone()} scale={1} />;
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

function CameraRig({ carRef }: { carRef: React.RefObject<THREE.Group | null> }) {
    const targetPositionRef = useRef(new THREE.Vector3(0, 5, 8));
    const targetLookAtRef = useRef(new THREE.Vector3(0, 1, 0));

    useFrame((state) => {
        if (carRef.current) {
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

            // Smooth the target position and look-at point
            targetPositionRef.current.lerp(newTargetPosition, 0.05);
            targetLookAtRef.current.lerp(newTargetLookAt, 0.05);

            // Apply smoothed values to camera
            state.camera.position.lerp(targetPositionRef.current, 0.1);
            state.camera.lookAt(targetLookAtRef.current);
        }
    });
    return null;
}

function StatusDisplay({ status, currentMessage }: { status: SystemStatus; currentMessage: string }) {
    const getStatusColor = (systemStatus: string) => {
        if (systemStatus === 'operational' || systemStatus === 'secure') return '#00ff00';
        if (systemStatus === 'fault' || systemStatus === 'compromised') return '#ff0000';
        return '#ffaa00';
    };

    const getAttentionColor = (level: number) => {
        if (level >= 70) return '#00ff00';
        if (level >= 40) return '#ffaa00';
        return '#ff0000';
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: '0',
                left: '0',
                bottom: '0',
                zIndex: 1000,
                background: 'rgba(0, 0, 0, 0.95)',
                padding: '40px',
                color: 'white',
                fontFamily: 'monospace',
                width: '450px',
                border: 'none',
                borderRight: '4px solid #333',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                pointerEvents: 'auto',
            }}
        >
            <h3 style={{ margin: '0 0 35px 0', fontSize: '22px', color: '#00ffff', fontWeight: 'bold', letterSpacing: '1px' }}>
                HANDS-FREE DRIVING SYSTEM
            </h3>

            <div style={{ marginBottom: '35px', padding: '20px', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', border: '2px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: '20px', marginBottom: '12px', color: '#ffff00', fontWeight: 'bold' }}>
                    HDFS: {status.hdfsActive ? '✓ ACTIVE' : '○ STANDBY'}
                </div>
                <div style={{ fontSize: '20px', marginBottom: '0px', fontWeight: 'bold' }}>
                    Control: {status.controlMode.toUpperCase()}
                </div>
            </div>

            <div style={{ marginBottom: '35px' }}>
                <div style={{ fontSize: '18px', marginBottom: '18px', color: '#aaa', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Sensor Status
                </div>
                <div style={{ fontSize: '17px', marginLeft: '15px', marginBottom: '12px' }}>
                    <span style={{ color: getStatusColor(status.radarStatus), fontSize: '24px' }}>●</span>
                    <span style={{ marginLeft: '15px', fontWeight: 'bold' }}>Radar: </span>
                    <span style={{ color: getStatusColor(status.radarStatus) }}>{status.radarStatus}</span>
                </div>
                <div style={{ fontSize: '17px', marginLeft: '15px', marginBottom: '12px' }}>
                    <span style={{ color: getStatusColor(status.cameraStatus), fontSize: '24px' }}>●</span>
                    <span style={{ marginLeft: '15px', fontWeight: 'bold' }}>Camera: </span>
                    <span style={{ color: getStatusColor(status.cameraStatus) }}>{status.cameraStatus}</span>
                </div>
                <div style={{ fontSize: '17px', marginLeft: '15px', marginBottom: '12px' }}>
                    <span style={{ color: getStatusColor(status.gpsStatus), fontSize: '24px' }}>●</span>
                    <span style={{ marginLeft: '15px', fontWeight: 'bold' }}>GPS: </span>
                    <span style={{ color: getStatusColor(status.gpsStatus) }}>{status.gpsStatus}</span>
                </div>
                <div style={{ fontSize: '17px', marginLeft: '15px' }}>
                    <span style={{ color: getStatusColor(status.mappingStatus), fontSize: '24px' }}>●</span>
                    <span style={{ marginLeft: '15px', fontWeight: 'bold' }}>Mapping: </span>
                    <span style={{ color: getStatusColor(status.mappingStatus) }}>{status.mappingStatus}</span>
                </div>
            </div>

            <div style={{ marginBottom: '35px' }}>
                <div style={{ fontSize: '18px', marginBottom: '15px', color: '#aaa', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Driver Attention
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '15px', gap: '12px' }}>
                    <div
                        style={{
                            width: '100%',
                            height: '40px',
                            background: '#333',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            border: '3px solid #555',
                        }}
                    >
                        <div
                            style={{
                                width: `${status.driverAttentionLevel}%`,
                                height: '100%',
                                background: getAttentionColor(status.driverAttentionLevel),
                                transition: 'all 0.3s',
                            }}
                        />
                    </div>
                    <span style={{ fontSize: '24px', color: getAttentionColor(status.driverAttentionLevel), fontWeight: 'bold' }}>
                        {status.driverAttentionLevel}%
                    </span>
                </div>
            </div>

            <div style={{ marginBottom: '35px' }}>
                <div style={{ fontSize: '18px', marginBottom: '15px', color: '#aaa', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Security
                </div>
                <div style={{ fontSize: '17px', marginLeft: '15px' }}>
                    <span style={{ color: getStatusColor(status.securityStatus), fontSize: '24px' }}>●</span>
                    <span style={{ marginLeft: '15px', color: getStatusColor(status.securityStatus), fontWeight: 'bold' }}>
                        {status.securityStatus.replace(/_/g, ' ').toUpperCase()}
                    </span>
                </div>
            </div>

            {currentMessage && (
                <div
                    style={{
                        marginTop: 'auto',
                        padding: '20px',
                        background: 'rgba(255, 255, 0, 0.25)',
                        borderLeft: '6px solid #ffff00',
                        fontSize: '17px',
                        borderRadius: '8px',
                        lineHeight: '1.6',
                        fontWeight: 'bold',
                    }}
                >
                    {currentMessage}
                </div>
            )}
        </div>
    );
}

function ScenarioSelector({
                              scenarios,
                              onSelectScenario,
                              currentScenario,
                              isPaused,
                              onTogglePause,
                          }: {
    scenarios: ScenarioConfig[];
    onSelectScenario: (scenario: ScenarioConfig) => void;
    currentScenario: ScenarioConfig | null;
    isPaused: boolean;
    onTogglePause: () => void;
}) {
    return (
        <div
            style={{
                position: 'absolute',
                top: '0',
                right: '0',
                bottom: '0',
                zIndex: 1000,
                background: 'rgba(0, 0, 0, 0.95)',
                padding: '40px',
                color: 'white',
                width: '500px',
                border: 'none',
                borderLeft: '4px solid #333',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                pointerEvents: 'auto',
            }}
        >
            <h3 style={{ margin: '0 0 30px 0', fontSize: '22px', color: '#00ffff', fontWeight: 'bold', letterSpacing: '1px' }}>
                SELECT SCENARIO
            </h3>

            {currentScenario && (
                <button
                    onClick={onTogglePause}
                    style={{
                        padding: '20px',
                        marginBottom: '25px',
                        background: isPaused ? '#ff9800' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
                    }}
                >
                    {isPaused ? '▶️ RESUME' : '⏸️ PAUSE'}
                </button>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {scenarios.map((scenario) => (
                    <button
                        key={scenario.id}
                        onClick={() => onSelectScenario(scenario)}
                        disabled={currentScenario?.id === scenario.id}
                        style={{
                            padding: '22px',
                            background: currentScenario?.id === scenario.id ? '#00ffff' : '#333',
                            color: currentScenario?.id === scenario.id ? '#000' : 'white',
                            border: currentScenario?.id === scenario.id ? '4px solid #00ffff' : '3px solid #555',
                            borderRadius: '10px',
                            cursor: currentScenario?.id === scenario.id ? 'default' : 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                            fontFamily: 'sans-serif',
                        }}
                        onMouseEnter={(e) => {
                            if (currentScenario?.id !== scenario.id) {
                                e.currentTarget.style.background = '#444';
                                e.currentTarget.style.borderColor = '#888';
                                e.currentTarget.style.transform = 'translateX(-5px)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (currentScenario?.id !== scenario.id) {
                                e.currentTarget.style.background = '#333';
                                e.currentTarget.style.borderColor = '#555';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }
                        }}
                    >
                        <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '17px' }}>
                            {scenario.name}
                        </div>
                        <div style={{ fontSize: '15px', opacity: 0.9, lineHeight: '1.6' }}>
                            {scenario.description}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

function ScenarioTimer({
                           elapsed,
                           duration,
                       }: {
    elapsed: number;
    duration: number;
}) {
    return (
        <div
            style={{
                position: 'absolute',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                background: 'rgba(0, 0, 0, 0.95)',
                padding: '18px 35px',
                borderRadius: '25px',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: '20px',
                border: '3px solid #555',
                fontWeight: 'bold',
            }}
        >
            Scenario Time: {elapsed.toFixed(1)}s / {duration}s
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const Scene = React.memo(({ playerCarRef, path, controlMode, shouldStop, isPaused }: {
    playerCarRef: React.RefObject<THREE.Group | null>;
    path: THREE.CatmullRomCurve3;
    controlMode: 'driver' | 'hdfs' | 'transitioning';
    shouldStop: boolean;
    isPaused: boolean;
}) => {
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
}, (prevProps, nextProps) => {
    // Return true if props are equal (prevent re-render)
    // Return false if props are different (allow re-render)
    return prevProps.controlMode === nextProps.controlMode &&
        prevProps.shouldStop === nextProps.shouldStop &&
        prevProps.isPaused === nextProps.isPaused &&
        prevProps.path === nextProps.path &&
        prevProps.playerCarRef === nextProps.playerCarRef;
});

Scene.displayName = 'Scene';

export default function DrivingScene() {
    const playerCarRef = useRef<THREE.Group>(null);
    const path = useMemo(() => createHighwayPath(), []);

    const [currentScenario, setCurrentScenario] = useState<ScenarioConfig | null>(null);
    const [systemStatus, setSystemStatus] = useState<SystemStatus>(scenarios[0].systemStatus);
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const isPausedRef = useRef<boolean>(false);
    const startTimeRef = useRef<number>(0);
    const pausedTimeRef = useRef<number>(0);
    const lastPauseTimeRef = useRef<number>(0);

    // Sync isPaused state with ref
    useEffect(() => {
        isPausedRef.current = isPaused;

        if (isPaused) {
            lastPauseTimeRef.current = Date.now();
        } else if (lastPauseTimeRef.current > 0) {
            pausedTimeRef.current += Date.now() - lastPauseTimeRef.current;
            lastPauseTimeRef.current = 0;
        }
    }, [isPaused]);

    useEffect(() => {
        if (!currentScenario) return;

        // Reset scenario
        setSystemStatus({ ...currentScenario.systemStatus });
        setCurrentMessage('');
        setElapsedTime(0);
        setIsPaused(false);
        isPausedRef.current = false;
        startTimeRef.current = Date.now();
        pausedTimeRef.current = 0;
        lastPauseTimeRef.current = 0;

        const interval = setInterval(() => {
            // Check the ref instead of state to avoid re-render issues
            if (isPausedRef.current) return;

            const elapsed = (Date.now() - startTimeRef.current - pausedTimeRef.current) / 1000;
            setElapsedTime(elapsed);

            // Process events
            const currentEvent = currentScenario.events.find(
                (event) => Math.abs(event.time - elapsed) < 0.1 && elapsed >= event.time
            );

            if (currentEvent) {
                setSystemStatus((prev) => {
                    const newStatus = { ...prev };
                    currentEvent.action(newStatus);
                    return newStatus;
                });
                setCurrentMessage(currentEvent.message);
            }

            // Auto-reset after scenario completes
            const maxTime = Math.max(...currentScenario.events.map((e) => e.time)) + 3;
            if (elapsed > maxTime) {
                setCurrentScenario(null);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [currentScenario]); // Only depend on currentScenario, not isPaused

    const handleSelectScenario = (scenario: ScenarioConfig) => {
        setCurrentScenario(scenario);
    };

    const handleTogglePause = () => {
        setIsPaused(!isPaused);
    };

    const scenarioDuration = currentScenario
        ? Math.max(...currentScenario.events.map((e) => e.time)) + 3
        : 0;

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: 'calc(100vh - 80px)', // Adjust 80px to match your header height
                margin: 0,
                padding: 0,
                background: '#000',
                overflow: 'hidden',
            }}
        >
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                {currentScenario && (
                    <>
                        <StatusDisplay status={systemStatus} currentMessage={currentMessage} />
                        <ScenarioTimer elapsed={elapsedTime} duration={scenarioDuration} />
                    </>
                )}
                <ScenarioSelector
                    scenarios={scenarios}
                    onSelectScenario={handleSelectScenario}
                    currentScenario={currentScenario}
                    isPaused={isPaused}
                    onTogglePause={handleTogglePause}
                />
            </div>

            <Canvas style={{ width: '100%', height: '100%' }}>
                <Scene
                    playerCarRef={playerCarRef}
                    path={path}
                    controlMode={systemStatus.controlMode}
                    shouldStop={!systemStatus.hdfsActive && systemStatus.driverAttentionLevel === 0}
                    isPaused={isPaused}
                />
            </Canvas>
        </div>
    );
}