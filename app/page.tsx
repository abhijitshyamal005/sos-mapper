"use client";
import React from "react";
import SOSButton from '../components/SOSButton';
import MapCanvas from '../components/MapCanvas';
import NetworkStatus from '../components/NetworkStatus';
import Alerts from '../components/Alerts';
import useBackgroundTask from '../utils/useBackgroundTask';

export default function Home() {
  useBackgroundTask();

  // Geolocation state
  const [location, setLocation] = React.useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = React.useState<string | null>(null);
  // Network state
  const [isOnline, setIsOnline] = React.useState(true);
  // Alert state
  const [alertMsg, setAlertMsg] = React.useState<string | null>(null);

  // Network Information API
  React.useEffect(() => {
    function updateStatus() {
      setIsOnline(navigator.onLine);
    }
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus();
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  // SOS handler
  const handleSOS = () => {
    if (!isOnline) {
      setAlertMsg('Cannot send SOS: You are offline.');
      return;
    }
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setLocation(coords);
          setAlertMsg(`SOS Sent! Location: ${coords.lat}, ${coords.lng}`);
        },
        err => {
          setLocationError('Error fetching location: ' + err.message);
          setAlertMsg('Error fetching location');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser');
      setAlertMsg('Geolocation is not supported by your browser');
    }
  };

  return (
    <main className="min-h-screen p-6 flex flex-col items-center gap-8 bg-gradient-to-br from-pink-500 via-red-400 to-yellow-300">
      <div className="flex flex-col items-center gap-2 mt-8">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg border-4 border-red-500">
          {/* Custom SVG icon for SafeRoute */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" stroke="#ef4444" strokeWidth="3" fill="#fff" />
            <path d="M20 10 L25 25 L15 25 Z" fill="#f59e42" stroke="#ef4444" strokeWidth="2" />
            <circle cx="20" cy="20" r="5" fill="#ef4444" />
          </svg>
        </span>
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg tracking-wide">SafeRoute</h1>
      </div>
      <section className="w-full max-w-md bg-white/80 rounded-xl shadow-md p-4 flex flex-col gap-4">
        <NetworkStatus isOnline={isOnline} />
        <SOSButton onSOS={handleSOS} />
        <MapCanvas location={location} />
        <Alerts message={alertMsg || locationError} />
      </section>
    </main>
  );
}
