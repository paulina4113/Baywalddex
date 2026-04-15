import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, QrCode } from 'lucide-react';
import { speciesDatabase } from '../data/species';

export function Scanner() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [selectedQR, setSelectedQR] = useState('');

  const handleScan = (qrId: string) => {
    setSelectedQR(qrId);
    setIsScanning(true);

    // Simulate scanning animation
    setTimeout(() => {
      navigate(`/species/${qrId}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl ml-4">QR Code Scanner</h1>
        </div>

        {/* Scanner View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="relative aspect-square bg-gray-900 rounded-xl overflow-hidden mb-4">
            {/* Scanner Frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-4 border-green-500 rounded-xl relative">
                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white"></div>
                
                {/* Scanning Line */}
                <AnimatePresence>
                  {isScanning && (
                    <motion.div
                      initial={{ top: 0 }}
                      animate={{ top: '100%' }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                      className="absolute left-0 w-full h-1 bg-green-400 shadow-lg"
                      style={{ boxShadow: '0 0 20px rgba(74, 222, 128, 0.8)' }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Scanning Status */}
            {isScanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-4 left-0 right-0 text-center text-white"
              >
                <div className="text-lg">Scanning QR Code...</div>
              </motion.div>
            )}
          </div>

          <div className="text-center text-gray-600 mb-4">
            <QrCode className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Point your camera at a QR code in the park</p>
            <p className="text-xs text-gray-500 mt-2">Or select a demo code below</p>
          </div>
        </motion.div>

        {/* Demo QR Codes */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg mb-4">Demo QR Codes (Tap to scan)</h2>
          <div className="grid grid-cols-3 gap-3">
            {speciesDatabase.map((species) => (
              <motion.button
                key={species.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScan(species.id)}
                disabled={isScanning}
                className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-3 hover:from-blue-100 hover:to-blue-200 transition-colors disabled:opacity-50"
              >
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <QrCode className="w-8 h-8 mb-1" />
                  <div className="text-xs text-center leading-tight">{species.name}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
