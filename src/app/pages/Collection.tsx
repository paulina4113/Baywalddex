import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Sparkles } from 'lucide-react';
import { speciesDatabase, SpeciesType } from '../data/species';
import { loadProgress } from '../utils/storage';

export function Collection() {
  const navigate = useNavigate();
  const progress = loadProgress();
  const [filter, setFilter] = useState<'all' | SpeciesType>('all');

  const filteredSpecies = speciesDatabase.filter(species => 
    filter === 'all' || species.type === filter
  );

  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    uncommon: 'from-green-400 to-green-500',
    rare: 'from-blue-400 to-blue-500',
    legendary: 'from-purple-400 to-yellow-400'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100">
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl ml-4">My Collection</h1>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">
              {progress.discoveredSpecies.length}/{speciesDatabase.length}
            </div>
            <p className="text-gray-600">Species Discovered</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{
                  width: `${(progress.discoveredSpecies.length / speciesDatabase.length) * 100}%`
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { value: 'all', label: 'All', icon: '🌍' },
            { value: 'animal', label: 'Animals', icon: '🦊' },
            { value: 'plant', label: 'Plants', icon: '🌱' },
            { value: 'insect', label: 'Insects', icon: '🐛' }
          ].map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => setFilter(value as any)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                filter === value
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredSpecies.map((species, index) => {
            const isDiscovered = progress.discoveredSpecies.includes(species.id);
            
            return (
              <motion.div
                key={species.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => isDiscovered && navigate(`/species/${species.id}`)}
                className={`relative rounded-xl overflow-hidden shadow-lg ${
                  isDiscovered ? 'cursor-pointer hover:shadow-xl' : ''
                } transition-all`}
              >
                {/* Species Card */}
                <div className="relative aspect-square">
                  <img
                    src={species.imageUrl}
                    alt={isDiscovered ? species.name : 'Unknown'}
                    className={`w-full h-full object-cover ${
                      !isDiscovered ? 'filter blur-sm grayscale' : ''
                    }`}
                  />
                  
                  {/* Rarity Badge */}
                  {isDiscovered && (
                    <div className={`absolute top-2 right-2 p-1 rounded-full bg-gradient-to-r ${rarityColors[species.rarity]}`}>
                      {species.rarity === 'legendary' && (
                        <Sparkles className="w-4 h-4 text-white" />
                      )}
                    </div>
                  )}

                  {/* Lock Overlay */}
                  {!isDiscovered && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Lock className="w-12 h-12 text-white" />
                    </div>
                  )}

                  {/* Species Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <h3 className="text-white">
                      {isDiscovered ? species.name : '???'}
                    </h3>
                    <p className="text-gray-300 text-xs">
                      {isDiscovered ? species.type : 'Not discovered'}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {progress.discoveredSpecies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl mb-2">No species discovered yet</h3>
            <p className="text-gray-600 mb-6">Start scanning QR codes to build your collection!</p>
            <button
              onClick={() => navigate('/scanner')}
              className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
            >
              Start Scanning
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
