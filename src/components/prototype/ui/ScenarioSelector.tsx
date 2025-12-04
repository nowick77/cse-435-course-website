import React from 'react';
import type { ScenarioConfig } from '../types';

type Props = {
    scenarios: ScenarioConfig[];
    onSelectScenario: (scenario: ScenarioConfig) => void;
    currentScenario: ScenarioConfig | null;
    isPaused: boolean;
    onTogglePause: () => void;
};

export default function ScenarioSelector({
                                             scenarios,
                                             onSelectScenario,
                                             currentScenario,
                                             isPaused,
                                             onTogglePause,
                                         }: Props) {
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
            <h3
                style={{
                    margin: '0 0 30px 0',
                    fontSize: '22px',
                    color: '#00ffff',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                }}
            >
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
                    {isPaused ? 'RESUME' : 'PAUSE'}
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
