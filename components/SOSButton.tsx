



export default function SOSButton({ onSOS }: { onSOS: () => void }) {


    const sendSOS = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    const coords = {
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude,
                    };
                    alert(`SOS Sent! Location: ${coords.lat}, ${coords.lon}`);
                },
                () => alert('Error fetching location')
            );
        } else {
            alert('Geolocation is not supported by your browser');
        }
    };

    return (
        <button
            className="flex items-center gap-3 px-8 py-3 rounded-xl shadow-lg bg-gradient-to-r from-red-600 via-orange-500 to-red-700 text-white font-bold text-lg hover:scale-105 hover:from-red-700 hover:to-orange-600 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 animate-pulse"
            onClick={onSOS}
        >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#F87171" />
                    <path stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                </svg>
            </span>
            Send <span className="ml-1 text-yellow-200">SOS</span> Location
        </button>
    );
}
