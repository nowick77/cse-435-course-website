import React from 'react';
import type { SystemStatus } from '../types';

type Props = {
    status: SystemStatus;
    currentMessage: string;
};

export default function StatusDisplay({ status, currentMessage }: Props) {
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
            <h3
                style={{
                    margin: '0 0 35px 0',
                    fontSize: '22px',
                    color: '#00ffff',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                }}
            >
                HANDS-FREE DRIVING SYSTEM
            </h3>

            <div
                style={{
                    marginBottom: '35px',
                    padding: '20px',
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    border: '2px solid rgba(255,255,255,0.2)',
                }}
            >
                <div style={{ fontSize: '20px', marginBottom: '12px', color: '#ffff00', fontWeight: 'bold' }}>
                    HDFS: {status.hdfsActive ? 'ACTIVE' : 'STANDBY'}
                </div>
                <div style={{ fontSize: '20px', marginBottom: '0px', fontWeight: 'bold' }}>
                    Control: {status.controlMode.toUpperCase()}
                </div>
            </div>

            <div style={{ marginBottom: '35px' }}>
                <div
                    style={{
                        fontSize: '18px',
                        marginBottom: '18px',
                        color: '#aaa',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                    }}
                >
                    Sensor Status
                </div>
                <div style={{ fontSize: '17px', marginLeft: '15px', marginBottom: '12px' }}>
                    <span style={{ color: getStatusColor(status.radarStatus), fontSize: '24px' }}></span>
                    <span style={{ marginLeft: '15px', fontWeight: 'bold' }}>Radar: </span>
                    <span style={{ color: getStatusColor(status.radarStatus) }}>{status.radarStatus}</span>
                </div>
                <div style={{ fontSize: '17px', marginLeft: '15px', marginBottom: '12px' }}>
                    <span style={{ color: getStatusColor(status.cameraStatus), fontSize: '24px' }}></span>
                    <span style={{ marginLeft: '15px', fontWeight: 'bold' }}>Camera: </span>
                    <span style={{ color: getStatusColor(status.cameraStatus) }}>{status.cameraStatus}</span>
                </div>
                <div style={{ fontSize: '17px', marginLeft: '15px', marginBottom: '12px' }}>
                    <span style={{ color: getStatusColor(status.gpsStatus), fontSize: '24px' }}></span>
                    <span style={{ marginLeft: '15px', fontWeight: 'bold' }}>GPS: </span>
                    <span style={{ color: getStatusColor(status.gpsStatus) }}>{status.gpsStatus}</span>
                </div>
                <div style={{ fontSize: '17px', marginLeft: '15px' }}>
                    <span style={{ color: getStatusColor(status.mappingStatus), fontSize: '24px' }}></span>
                    <span style={{ marginLeft: '15px', fontWeight: 'bold' }}>Mapping: </span>
                    <span style={{ color: getStatusColor(status.mappingStatus) }}>{status.mappingStatus}</span>
                </div>
            </div>

            <div style={{ marginBottom: '35px' }}>
                <div
                    style={{
                        fontSize: '18px',
                        marginBottom: '15px',
                        color: '#aaa',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                    }}
                >
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
                    <span
                        style={{
                            fontSize: '24px',
                            color: getAttentionColor(status.driverAttentionLevel),
                            fontWeight: 'bold',
                        }}
                    >
            {status.driverAttentionLevel}%
          </span>
                </div>
            </div>

            <div style={{ marginBottom: '35px' }}>
                <div
                    style={{
                        fontSize: '18px',
                        marginBottom: '15px',
                        color: '#aaa',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                    }}
                >
                    Security
                </div>
                <div style={{ fontSize: '17px', marginLeft: '15px' }}>
                    <span style={{ color: getStatusColor(status.securityStatus), fontSize: '24px' }}></span>
                    <span
                        style={{
                            marginLeft: '15px',
                            color: getStatusColor(status.securityStatus),
                            fontWeight: 'bold',
                        }}
                    >
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