import { Link } from 'react-router';
import { Scan, BookOpen, Award, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { loadProgress } from '../utils/storage';
import { speciesDatabase } from '../data/species';
import { ProgressBar } from '../components/ProgressBar';

export function Home() {
  const progress = loadProgress();
  const totalSpecies = speciesDatabase.length;
  const discoveredCount = progress.discoveredSpecies.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100">
      <div className="max-w-md mx-auto p-6 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl mb-2">🌿 Nature Explorer</h1>
          <p className="text-gray-600">Discover the wonders of the park!</p>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl mb-4">Your Progress</h2>
          <ProgressBar
            current={discoveredCount}
            total={totalSpecies}
            label="Species Discovered"
          />
          <div className="mt-4 flex justify-around text-center">
            <div>
              <div className="text-2xl">🏆</div>
              <div className="text-sm text-gray-600">Badges</div>
              <div className="font-semibold">{progress.earnedBadges.length}</div>
            </div>
            <div>
              <div className="text-2xl">⭐</div>
              <div className="text-sm text-gray-600">Points</div>
              <div className="font-semibold">{progress.totalPoints}</div>
            </div>
            <div>
              <div className="text-2xl">✅</div>
              <div className="text-sm text-gray-600">Quizzes</div>
              <div className="font-semibold">{progress.correctQuizzes.length}</div>
            </div>
          </div>
        </motion.div>

        {/* Action Cards */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/scanner">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl mb-1">Scan QR Code</h3>
                    <p className="text-blue-100 text-sm">Discover new species!</p>
                  </div>
                  <Scan className="w-12 h-12" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/collection">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl mb-1">My Collection</h3>
                    <p className="text-purple-100 text-sm">View discovered species</p>
                  </div>
                  <BookOpen className="w-12 h-12" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/badges">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl mb-1">Badges</h3>
                    <p className="text-amber-100 text-sm">See your achievements</p>
                  </div>
                  <Award className="w-12 h-12" />
                </div>
              </div>
            </Link>
          </motion.div>

          {discoveredCount === totalSpecies && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/diploma">
                <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border-4 border-yellow-400">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl mb-1">Get Your Diploma!</h3>
                      <p className="text-pink-100 text-sm">Congratulations! 🎉</p>
                    </div>
                    <Trophy className="w-12 h-12" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
