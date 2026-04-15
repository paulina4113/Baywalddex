import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Lock } from 'lucide-react';
import { badges, speciesDatabase } from '../data/species';
import { loadProgress } from '../utils/storage';

export function Badges() {
  const navigate = useNavigate();
  const progress = loadProgress();

  const getBadgeProgress = (badge: typeof badges[0]) => {
    let current = 0;

    if (badge.category === 'discovery') {
      current = progress.discoveredSpecies.length;
    } else if (badge.category === 'quiz') {
      current = progress.correctQuizzes.length;
    } else if (badge.category === 'type' && badge.type) {
      current = progress.discoveredSpecies.filter(sId => {
        const s = speciesDatabase.find(sp => sp.id === sId);
        return s?.type === badge.type;
      }).length;
    } else if (badge.category === 'rarity') {
      current = progress.discoveredSpecies.some(sId => {
        const s = speciesDatabase.find(sp => sp.id === sId);
        return s?.rarity === 'legendary';
      }) ? 1 : 0;
    }

    return { current, total: badge.requirement };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl ml-4">Badges & Achievements</h1>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">
              {progress.earnedBadges.length}/{badges.length}
            </div>
            <p className="text-gray-600">Badges Earned</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                style={{
                  width: `${(progress.earnedBadges.length / badges.length) * 100}%`
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Badges List */}
        <div className="space-y-4">
          {badges.map((badge, index) => {
            const isEarned = progress.earnedBadges.includes(badge.id);
            const { current, total } = getBadgeProgress(badge);
            const progressPercent = Math.min((current / total) * 100, 100);

            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  isEarned ? 'border-2 border-yellow-400' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Badge Icon */}
                    <div
                      className={`text-5xl ${
                        !isEarned ? 'grayscale opacity-30' : ''
                      }`}
                    >
                      {badge.icon}
                    </div>

                    {/* Badge Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-lg ${!isEarned ? 'text-gray-400' : ''}`}>
                          {badge.name}
                        </h3>
                        {!isEarned && <Lock className="w-5 h-5 text-gray-400" />}
                        {isEarned && <span className="text-2xl">✓</span>}
                      </div>

                      <p className={`text-sm mb-3 ${!isEarned ? 'text-gray-400' : 'text-gray-600'}`}>
                        {badge.description}
                      </p>

                      {/* Progress Bar */}
                      {!isEarned && (
                        <div>
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{current}/{total}</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {isEarned && (
                        <div className="text-sm text-green-600 flex items-center gap-1">
                          <span>✓</span>
                          <span>Completed!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Earned Badge Shine Effect */}
                {isEarned && (
                  <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {progress.earnedBadges.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 bg-white rounded-2xl shadow-lg mt-6"
          >
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl mb-2">No badges yet</h3>
            <p className="text-gray-600 mb-6 px-6">
              Start exploring and discovering species to earn badges!
            </p>
            <button
              onClick={() => navigate('/scanner')}
              className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
            >
              Start Exploring
            </button>
          </motion.div>
        )}

        {/* All Badges Earned */}
        {progress.earnedBadges.length === badges.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl shadow-lg mt-6"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl mb-2">All Badges Earned!</h3>
            <p className="text-lg">You're a true Nature Explorer!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
