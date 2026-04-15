import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, Award } from 'lucide-react';
import { speciesDatabase, badges } from '../data/species';
import { loadProgress, saveProgress } from '../utils/storage';
import confetti from 'canvas-confetti';

export function SpeciesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(loadProgress());
  const [isNewDiscovery, setIsNewDiscovery] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  const species = speciesDatabase.find(s => s.id === id);

  useEffect(() => {
    if (species && !progress.discoveredSpecies.includes(species.id)) {
      setIsNewDiscovery(true);
      
      // Add to discovered species
      const updatedProgress = {
        ...progress,
        discoveredSpecies: [...progress.discoveredSpecies, species.id],
        totalPoints: progress.totalPoints + 10
      };

      // Check for new badges
      const earnedBadges = checkBadges(updatedProgress);
      setNewBadges(earnedBadges);

      setProgress(updatedProgress);
      saveProgress(updatedProgress);

      // Celebration animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [species?.id]);

  const checkBadges = (currentProgress: typeof progress) => {
    const newlyEarned: string[] = [];

    badges.forEach(badge => {
      if (!currentProgress.earnedBadges.includes(badge.id)) {
        let earned = false;

        if (badge.category === 'discovery') {
          earned = currentProgress.discoveredSpecies.length >= badge.requirement;
        } else if (badge.category === 'quiz') {
          earned = currentProgress.correctQuizzes.length >= badge.requirement;
        } else if (badge.category === 'type' && badge.type) {
          const typeCount = currentProgress.discoveredSpecies.filter(sId => {
            const s = speciesDatabase.find(sp => sp.id === sId);
            return s?.type === badge.type;
          }).length;
          earned = typeCount >= badge.requirement;
        } else if (badge.category === 'rarity') {
          const hasLegendary = currentProgress.discoveredSpecies.some(sId => {
            const s = speciesDatabase.find(sp => sp.id === sId);
            return s?.rarity === 'legendary';
          });
          earned = hasLegendary;
        }

        if (earned) {
          newlyEarned.push(badge.id);
          currentProgress.earnedBadges.push(badge.id);
        }
      }
    });

    return newlyEarned;
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (!species || quizResult !== null) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === species.quiz.correctAnswer;
    setQuizResult(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect && !progress.correctQuizzes.includes(species.id)) {
      const updatedProgress = {
        ...progress,
        correctQuizzes: [...progress.correctQuizzes, species.id],
        totalPoints: progress.totalPoints + 5
      };

      const earnedBadges = checkBadges(updatedProgress);
      if (earnedBadges.length > 0) {
        setNewBadges([...newBadges, ...earnedBadges]);
      }

      setProgress(updatedProgress);
      saveProgress(updatedProgress);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  if (!species) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Species not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    uncommon: 'from-green-400 to-green-500',
    rare: 'from-blue-400 to-blue-500',
    legendary: 'from-purple-400 to-yellow-400'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100">
      <div className="max-w-md mx-auto">
        {/* Header with Image */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={species.imageUrl}
            alt={species.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <button
            onClick={() => navigate('/')}
            className="absolute top-6 left-6 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${rarityColors[species.rarity]} text-white text-sm mb-2`}>
                {species.rarity === 'legendary' && <Sparkles className="w-4 h-4 mr-1" />}
                {species.rarity.charAt(0).toUpperCase() + species.rarity.slice(1)}
              </div>
              <h1 className="text-3xl text-white mb-1">{species.name}</h1>
              <p className="text-gray-200 italic">{species.scientificName}</p>
            </motion.div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* New Discovery Banner */}
          <AnimatePresence>
            {isNewDiscovery && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-6 text-center shadow-lg"
              >
                <Sparkles className="w-12 h-12 mx-auto mb-2" />
                <h2 className="text-2xl mb-1">New Discovery!</h2>
                <p className="text-lg">You found a {species.name}!</p>
                <p className="text-sm mt-2 opacity-90">+10 points</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* New Badges */}
          <AnimatePresence>
            {newBadges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-center mb-3">
                  <Award className="w-8 h-8 mr-2" />
                  <h3 className="text-xl">New Badge{newBadges.length > 1 ? 's' : ''}!</h3>
                </div>
                <div className="space-y-2">
                  {newBadges.map(badgeId => {
                    const badge = badges.find(b => b.id === badgeId);
                    return badge ? (
                      <div key={badge.id} className="flex items-center justify-center">
                        <span className="text-2xl mr-2">{badge.icon}</span>
                        <span>{badge.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Species Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-4">
              {species.type === 'animal' && '🦊 Animal'}
              {species.type === 'plant' && '🌱 Plant'}
              {species.type === 'insect' && '🐛 Insect'}
            </div>
            
            <h3 className="text-lg mb-2">Description</h3>
            <p className="text-gray-700 mb-4">{species.description}</p>

            <h3 className="text-lg mb-2">Habitat</h3>
            <p className="text-gray-700 mb-4">{species.habitat}</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h3 className="text-lg mb-2">💡 Fun Fact</h3>
              <p className="text-gray-700">{species.funFact}</p>
            </div>
          </motion.div>

          {/* Quiz Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            {!showQuiz ? (
              <button
                onClick={() => setShowQuiz(true)}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-shadow"
              >
                Take Quiz (+5 points)
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">🎓 Quiz Time!</h3>
                <p className="mb-4">{species.quiz.question}</p>
                
                <div className="space-y-3">
                  {species.quiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      disabled={quizResult !== null}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        quizResult === null
                          ? 'bg-gray-100 hover:bg-gray-200'
                          : index === species.quiz.correctAnswer
                          ? 'bg-green-100 border-2 border-green-500'
                          : selectedAnswer === index
                          ? 'bg-red-100 border-2 border-red-500'
                          : 'bg-gray-100'
                      }`}
                    >
                      {option}
                      {quizResult !== null && index === species.quiz.correctAnswer && ' ✓'}
                      {quizResult !== null && selectedAnswer === index && index !== species.quiz.correctAnswer && ' ✗'}
                    </button>
                  ))}
                </div>

                {quizResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-xl ${
                      quizResult === 'correct'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {quizResult === 'correct' ? (
                      <div>
                        <p className="font-semibold">🎉 Correct!</p>
                        <p className="text-sm">You earned 5 points!</p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-semibold">Not quite!</p>
                        <p className="text-sm">Try learning more about this species.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/collection')}
              className="flex-1 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
            >
              View Collection
            </button>
            <button
              onClick={() => navigate('/scanner')}
              className="flex-1 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              Scan Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
