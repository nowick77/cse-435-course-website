import type { ScenarioConfig } from './types';

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
                message: 'Driver Attention Level decreasing (70%)',
                action: (status) => {
                    status.driverAttentionLevel = 70;
                },
            },
            {
                time: 16,
                type: 'attention_warning_2',
                message: 'WARNING: Low driver attention (40%). Please focus on the road.',
                action: (status) => {
                    status.driverAttentionLevel = 40;
                },
            },
            {
                time: 20,
                type: 'attention_restored',
                message: 'Driver attention restored (100%)',
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
                message: 'Construction zone detected. Mapping data unavailable.',
                action: (status) => {
                    status.mappingStatus = 'construction';
                },
            },
            {
                time: 8,
                type: 'radar_fault',
                message: 'RADAR SENSOR FAULT DETECTED',
                action: (status) => {
                    status.radarStatus = 'fault';
                },
            },
            {
                time: 10,
                type: 'fail_safe_warning',
                message: 'CRITICAL: Multiple system failures. Initiating fail-safe protocol.',
                action: () => {},
            },
            {
                time: 12,
                type: 'transition_to_driver',
                message: 'TAKE OVER NOW: Transferring control to driver. Reducing speed.',
                action: (status) => {
                    status.controlMode = 'transitioning';
                },
            },
            {
                time: 15,
                type: 'driver_control',
                message: 'Driver control restored. HDFS disengaged. Pull over safely when possible.',
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
                message: 'Driver attention decreasing (60%)',
                action: (status) => {
                    status.driverAttentionLevel = 60;
                },
            },
            {
                time: 8,
                type: 'attention_drop_2',
                message: 'WARNING: Low attention (30%). Visual and audio alerts active.',
                action: (status) => {
                    status.driverAttentionLevel = 30;
                },
            },
            {
                time: 11,
                type: 'attention_critical',
                message: 'CRITICAL: No driver response (10%). Hands not detected on wheel.',
                action: (status) => {
                    status.driverAttentionLevel = 10;
                },
            },
            {
                time: 14,
                type: 'emergency_protocol',
                message: 'EMERGENCY: Driver unresponsive. Activating emergency protocol.',
                action: (status) => {
                    status.driverAttentionLevel = 0;
                },
            },
            {
                time: 16,
                type: 'emergency_stop',
                message: 'Reducing speed. Activating hazard lights. Moving to shoulder.',
                action: (status) => {
                    status.controlMode = 'hdfs';
                    status.driverAttentionLevel = 0;
                },
            },
            {
                time: 20,
                type: 'stop_complete',
                message: 'Vehicle stopped safely. Emergency services notified. Hazards active.',
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
                message: 'Driver activating HDFS. Transferring control...',
                action: (status) => {
                    status.controlMode = 'transitioning';
                },
            },
            {
                time: 7,
                type: 'hdfs_active',
                message: 'HDFS engaged. System in control. Driver monitoring required.',
                action: (status) => {
                    status.hdfsActive = true;
                    status.controlMode = 'hdfs';
                },
            },
            {
                time: 11,
                type: 'driver_intervention',
                message: 'Driver steering input detected. Transitioning to manual control...',
                action: (status) => {
                    status.controlMode = 'transitioning';
                },
            },
            {
                time: 13,
                type: 'manual_control',
                message: 'Driver in control. HDFS on standby.',
                action: (status) => {
                    status.hdfsActive = false;
                    status.controlMode = 'driver';
                },
            },
            {
                time: 17,
                type: 'reactivate_hdfs',
                message: 'Driver reactivating HDFS...',
                action: (status) => {
                    status.controlMode = 'transitioning';
                },
            },
            {
                time: 19,
                type: 'hdfs_reengaged',
                message: 'HDFS re-engaged successfully.',
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
                message: 'System secure. Encrypted communication active. Authentication verified.',
                action: () => {},
            },
            {
                time: 5,
                type: 'security_check',
                message: 'Security Check: Digital signature valid. Command origin verified.',
                action: () => {},
            },
            {
                time: 8,
                type: 'unauthorized_attempt',
                message: 'SECURITY ALERT: Unauthorized command detected from external source.',
                action: (status) => {
                    status.securityStatus = 'unauthorized_attempt';
                },
            },
            {
                time: 10,
                type: 'command_rejected',
                message: 'Command REJECTED. Invalid authentication token. Source: Unknown.',
                action: () => {},
            },
            {
                time: 12,
                type: 'security_log',
                message: 'Incident logged. Security team notified. System integrity maintained.',
                action: (status) => {
                    status.securityStatus = 'secure';
                },
            },
            {
                time: 15,
                type: 'intrusion_attempt',
                message: 'CRITICAL: Multiple intrusion attempts detected. CAN bus anomaly.',
                action: (status) => {
                    status.securityStatus = 'compromised';
                },
            },
            {
                time: 17,
                type: 'lockdown',
                message: 'SECURITY LOCKDOWN: Disabling HDFS. Driver control only. Pulling diagnostic data.',
                action: (status) => {
                    status.hdfsActive = false;
                    status.controlMode = 'driver';
                },
            },
            {
                time: 20,
                type: 'secure_restored',
                message: 'Security protocols updated. System secured. HDFS will require re-authorization.',
                action: (status) => {
                    status.securityStatus = 'secure';
                },
            },
        ],
    },
];

export default scenarios;
