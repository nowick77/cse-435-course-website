import DrivingScene from '@/components/DrivingScene';

export default function DemoPage() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
        }}>
            <DrivingScene />
        </div>
    );
}