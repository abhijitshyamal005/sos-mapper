import { useEffect, useRef } from 'react';

export default function MapCanvas({ location }: { location: { lat: number; lng: number } | null }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = 600;
        canvas.height = 400;

        // Draw a subtle map icon background
        const mapIcon = new Image();
        mapIcon.src = '/globe.svg'; // Use your public folder icon
        mapIcon.onload = () => {
            ctx.globalAlpha = 0.15;
            ctx.drawImage(mapIcon, canvas.width / 2 - 100, canvas.height / 2 - 100, 200, 200);
            ctx.globalAlpha = 1;
        };

        // Draw marker if location is provided
        if (location) {
            const x = canvas.width / 2;
            const y = canvas.height / 2;
            ctx.save();
            ctx.shadowColor = '#2563eb';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(37, 99, 235, 0.7)'; // blue
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#2563eb';
            ctx.stroke();
            ctx.restore();
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('📍', x, y);
        }
    }, [location]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-2 text-lg font-bold text-blue-900 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v20m10-10H2" />
                </svg>
                Map Canvas
            </div>
            {location && (
                <div className="text-green-700 font-semibold mb-2">
                    Current Location: Latitude {location.lat.toFixed(5)}, Longitude {location.lng.toFixed(5)}
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="border-4 border-blue-300 shadow-xl rounded-xl bg-white"
                style={{ width: 600, height: 400 }}
            />
        </div>
    );
}
