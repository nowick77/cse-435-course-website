import React from 'react';

type Props = {
    elapsed: number;
    duration: number;
};

export default function ScenarioTimer({ elapsed, duration }: Props) {
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
