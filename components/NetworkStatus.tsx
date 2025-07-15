'use client';

// Custom type for NetworkInformation
interface NetworkInformation {
  effectiveType?: string;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}
import { useEffect, useState } from 'react';

export default function NetworkStatus({ isOnline }: { isOnline: boolean }) {
  // Use isOnline for basic status, fallback to connection type if available
  const [status, setStatus] = useState(isOnline ? 'Online' : 'Offline');

  useEffect(() => {
    const conn = (navigator as NavigatorWithConnection).connection;
    const updateNetwork = () => {
      if (conn) setStatus(conn.effectiveType || 'unknown');
      else setStatus('Not supported');
    };
    updateNetwork();
    if (conn && typeof conn.addEventListener === 'function') {
      conn.addEventListener('change', updateNetwork);
    }
    return () => {
      if (conn && typeof conn.removeEventListener === 'function') {
        conn.removeEventListener('change', updateNetwork);
      }
    };
  }, []);

  // Choose color and icon based on status
  let color = 'bg-gray-300 text-gray-700';
  let icon = (
    <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 20h20M4 16h16M7 12h10M10 8h4" />
    </svg>
  );
  if (status === '4g') {
    color = 'bg-green-100 text-green-800';
    icon = (
      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 20h20M4 16h16M7 12h10M10 8h4" />
      </svg>
    );
  } else if (status === '3g') {
    color = 'bg-yellow-100 text-yellow-800';
    icon = (
      <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 20h20M4 16h16M7 12h10" />
      </svg>
    );
  } else if (status === '2g') {
    color = 'bg-orange-100 text-orange-800';
    icon = (
      <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 20h20M4 16h16M7 12h10" />
      </svg>
    );
  } else if (status === 'slow-2g' || status === 'unknown') {
    color = 'bg-red-100 text-red-800';
    icon = (
      <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 20h20M4 16h16" />
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm ${color}`}>
      {icon}
      <span className="font-medium">Network:</span>
      <span className="font-bold">{status}</span>
    </div>
  );
}
