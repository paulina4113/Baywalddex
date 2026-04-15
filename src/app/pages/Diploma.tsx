import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { loadProgress } from '../utils/storage';
import confetti from 'canvas-confetti';

export function Diploma() {
  const navigate = useNavigate();
  const progress = loadProgress();

  useEffect(() => {
    // Celebration animation
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FFA500', '#FF6347']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FFA500', '#FF6347']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Nature Explorer Diploma',
        text: `I completed the Nature Explorer challenge! I discovered all ${progress.discoveredSpecies.length} species and earned ${progress.earnedBadges.length} badges!`,
      });
    } else {
      alert('Share feature not supported on this device');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-100">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
              title="Share"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Diploma */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-8 border-yellow-400"
          id="diploma"
        >
          {/* Decorative Corner Elements */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-yellow-500 rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-yellow-500 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-yellow-500 rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-yellow-500 rounded-br-xl"></div>

            {/* Content */}
            <div className="py-8 text-center">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-6xl mb-4">🏆</div>
                <h1 className="text-4xl md:text-5xl text-amber-900 mb-2">
                  Certificate of Achievement
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto mb-6"></div>
              </motion.div>

              {/* Body */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                <p className="text-xl text-gray-700">This certifies that</p>
                
                <div className="py-4 px-8 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-300 inline-block">
                  <h2 className="text-3xl md:text-4xl text-amber-900">
                    Junior Nature Explorer
                  </h2>
                </div>

                <p className="text-lg text-gray-700 max-w-xl mx-auto leading-relaxed">
                  has successfully completed the <span className="font-semibold text-amber-900">Nature Explorer Challenge</span> by 
                  discovering all <span className="font-semibold">{progress.discoveredSpecies.length} species</span> in the park, 
                  correctly answering <span className="font-semibold">{progress.correctQuizzes.length} quizzes</span>, and 
                  earning <span className="font-semibold">{progress.earnedBadges.length} badges</span>.
                </p>

                <p className="text-lg text-gray-700">
                  Total Points: <span className="font-semibold text-amber-900 text-2xl">{progress.totalPoints}</span>
                </p>

                {/* Badges Display */}
                <div className="flex justify-center gap-3 flex-wrap my-6">
                  <div className="text-4xl">🌟</div>
                  <div className="text-4xl">🔍</div>
                  <div className="text-4xl">🎯</div>
                  <div className="text-4xl">👑</div>
                  <div className="text-4xl">🧠</div>
                </div>

                {/* Date and Signature */}
                <div className="mt-8 pt-6 border-t-2 border-gray-200">
                  <p className="text-gray-600 mb-6">Awarded on {currentDate}</p>
                  
                  <div className="flex justify-around max-w-md mx-auto mt-8">
                    <div className="text-center">
                      <div className="w-40 border-b-2 border-gray-400 mb-2"></div>
                      <p className="text-sm text-gray-600">Park Director</p>
                    </div>
                    <div className="text-center">
                      <div className="w-40 border-b-2 border-gray-400 mb-2"></div>
                      <p className="text-sm text-gray-600">Chief Naturalist</p>
                    </div>
                  </div>
                </div>

                {/* Seal */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                  className="inline-block mt-6"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-white shadow-lg border-4 border-yellow-300">
                    <div className="text-center">
                      <div className="text-2xl">✓</div>
                      <div className="text-xs">OFFICIAL</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 space-y-4"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <h3 className="text-xl mb-4">🎉 Congratulations! 🎉</h3>
            <p className="text-gray-700 mb-4">
              You've become a certified Nature Explorer! Share your achievement with friends and family.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share Achievement
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl mb-3">🌍 Your Impact</h3>
            <ul className="space-y-2 text-sm">
              <li>✓ You learned about {progress.discoveredSpecies.length} different species</li>
              <li>✓ You explored various habitats in the park</li>
              <li>✓ You gained knowledge about biodiversity and conservation</li>
              <li>✓ You're now a nature ambassador!</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
