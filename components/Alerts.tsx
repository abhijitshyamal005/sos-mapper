
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Alerts({ message }: { message: string | null }) {
    const { ref } = useIntersectionObserver();

    return (
        <div
            ref={ref}
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-200 border-l-8 border-yellow-600 rounded-lg shadow-lg"
        >
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400 text-yellow-900 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#FDE68A" />
                    <path stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                </svg>
            </span>
            <div>
                {message ? (
                    <p className="text-lg font-semibold text-yellow-900">{message}</p>
                ) : (
                    <p className="text-gray-400 italic">Scroll down to load alerts...</p>
                )}
            </div>
        </div>
    );
}
