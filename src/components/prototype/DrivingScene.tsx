'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import scenarios from './scenarios';
import type { ScenarioConfig, SystemStatus } from './types';
import { createHighwayPath } from './scene/createHighwayPath';
import Scene from './scene/Scene';
import StatusDisplay from './ui/StatusDisplay';
import ScenarioSelector from './ui/ScenarioSelector';
import ScenarioTimer from './ui/ScenarioTimer';

export default function DrivingScene() {
    const playerCarRef = useRef<THREE.Group>(null);
    const path = useMemo(() => createHighwayPath(), []);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.createImageBitmap) {
            try {
                // Force three to fall back to TextureLoader (ImageBitmap loader fails with blob URIs)
                delete (window as typeof window & { createImageBitmap?: typeof window.createImageBitmap }).createImageBitmap;
            } catch {
                (window as typeof window & { createImageBitmap?: typeof window.createImageBitmap }).createImageBitmap = undefined;
            }
        }
    }, []);

    const [currentScenario, setCurrentScenario] = useState<ScenarioConfig | null>(null);
    const [systemStatus, setSystemStatus] = useState<SystemStatus>(() => ({
        ...scenarios[0].systemStatus,
    }));
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const isPausedRef = useRef<boolean>(false);
    const startTimeRef = useRef<number>(0);
    const pausedTimeRef = useRef<number>(0);
    const lastPauseTimeRef = useRef<number>(0);

    useEffect(() => {
        isPausedRef.current = isPaused;

        if (isPaused) {
            lastPauseTimeRef.current = Date.now();
        } else if (lastPauseTimeRef.current > 0) {
            pausedTimeRef.current += Date.now() - lastPauseTimeRef.current;
            lastPauseTimeRef.current = 0;
        }
    }, [isPaused]);

    // Scenario runner
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
            if (isPausedRef.current) return;

            const elapsed =
                (Date.now() - startTimeRef.current - pausedTimeRef.current) / 1000;
            setElapsedTime(elapsed);

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

            const maxTime = Math.max(...currentScenario.events.map((e) => e.time)) + 3;
            if (elapsed > maxTime) {
                setCurrentScenario(null);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [currentScenario]);

    const handleSelectScenario = (scenario: ScenarioConfig) => {
        setCurrentScenario(scenario);
    };

    const handleTogglePause = () => {
        setIsPaused((prev) => !prev);
    };

    const scenarioDuration = currentScenario ? Math.max(...currentScenario.events.map(
        (e) => e.time)
    ) + 3 : 0;

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: 'calc(100vh - 80px)',
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
