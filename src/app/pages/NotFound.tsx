import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Oops! This page seems to have wandered off the trail.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors inline-flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
