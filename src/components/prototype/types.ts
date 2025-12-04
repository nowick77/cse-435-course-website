
type ScenarioId = 'scenario1' | 'scenario2' | 'scenario3' | 'scenario4' | 'scenario5';

export type ControlMode = 'driver' | 'hdfs' | 'transitioning';

export interface SystemStatus {
    hdfsActive: boolean;
    radarStatus: 'operational' | 'fault';
    cameraStatus: 'operational' | 'fault';
    gpsStatus: 'operational' | 'fault';
    mappingStatus: 'operational' | 'construction' | 'unavailable';
    driverAttentionLevel: number; // 0-100
    controlMode: ControlMode;
    securityStatus: 'secure' | 'unauthorized_attempt' | 'compromised';
}

export interface ScenarioConfig {
    id: ScenarioId;
    name: string;
    description: string;
    systemStatus: SystemStatus;
    events: ScenarioEvent[];
}

export interface ScenarioEvent {
    time: number; // seconds into scenario
    type: string;
    action: (status: SystemStatus) => void;
    message: string;
}
