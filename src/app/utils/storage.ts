export interface UserProgress {
  discoveredSpecies: string[];
  correctQuizzes: string[];
  earnedBadges: string[];
  totalPoints: number;
}

const STORAGE_KEY = 'park-nature-app-progress';

export const loadProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  
  return {
    discoveredSpecies: [],
    correctQuizzes: [],
    earnedBadges: [],
    totalPoints: 0
  };
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const resetProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
