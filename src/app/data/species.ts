export type SpeciesType = 'animal' | 'plant' | 'insect';

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Species {
  id: string;
  name: string;
  scientificName: string;
  type: SpeciesType;
  description: string;
  habitat: string;
  funFact: string;
  imageUrl: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  quiz: Quiz;
}

export const speciesDatabase: Species[] = [
  {
    id: 'qr-001',
    name: 'Red Fox',
    scientificName: 'Vulpes vulpes',
    type: 'animal',
    description: 'The red fox is the largest of the true foxes. They are incredibly adaptable and can be found in diverse habitats from arctic tundra to urban areas.',
    habitat: 'Forests, grasslands, mountains, and deserts',
    funFact: 'Red foxes can hear a mouse squeaking 100 feet away!',
    imageUrl: 'https://images.unsplash.com/photo-1600313123344-559315bcc3a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBmb3glMjB3aWxkbGlmZXxlbnwxfHx8fDE3NzYyMDMwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rarity: 'uncommon',
    quiz: {
      question: 'What is the main diet of a red fox?',
      options: ['Only plants', 'Small mammals and birds', 'Only fish', 'Large deer'],
      correctAnswer: 1
    }
  },
  {
    id: 'qr-002',
    name: 'Monarch Butterfly',
    scientificName: 'Danaus plexippus',
    type: 'insect',
    description: 'Famous for their incredible migration, monarch butterflies travel thousands of miles between North America and Mexico.',
    habitat: 'Fields, meadows, and gardens with milkweed',
    funFact: 'Monarchs can travel up to 3,000 miles during migration!',
    imageUrl: 'https://images.unsplash.com/photo-1694432670997-758e7b3ddd02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25hcmNoJTIwYnV0dGVyZmx5JTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NzYyNjI5NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rarity: 'rare',
    quiz: {
      question: 'What plant do monarch caterpillars eat?',
      options: ['Oak leaves', 'Milkweed', 'Grass', 'Pine needles'],
      correctAnswer: 1
    }
  },
  {
    id: 'qr-003',
    name: 'Oak Tree',
    scientificName: 'Quercus robur',
    type: 'plant',
    description: 'The mighty oak is a keystone species, supporting hundreds of insect species and providing food for many mammals and birds.',
    habitat: 'Temperate forests and woodlands',
    funFact: 'Oak trees can live for over 1,000 years and support 2,300+ species!',
    imageUrl: 'https://images.unsplash.com/photo-1668796521460-377bfc6bd809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvYWslMjB0cmVlJTIwbmF0dXJlfGVufDF8fHx8MTc3NjIxMzQ5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rarity: 'common',
    quiz: {
      question: 'What is the fruit of an oak tree called?',
      options: ['Pine cone', 'Acorn', 'Berry', 'Nut'],
      correctAnswer: 1
    }
  },
  {
    id: 'qr-004',
    name: 'European Bison',
    scientificName: 'Bison bonasus',
    type: 'animal',
    description: 'The European bison, or wisent, is Europe\'s heaviest land mammal. Once nearly extinct, conservation efforts have helped their population recover.',
    habitat: 'Mixed forests and grasslands',
    funFact: 'European bison can weigh up to 1,000 kg (2,200 lbs)!',
    imageUrl: 'https://images.unsplash.com/photo-1730221176590-dbf1bbf3373e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGVhbiUyMGJpc29uJTIwd2lsZGxpZmV8ZW58MXx8fHwxNzc2MjYyOTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rarity: 'legendary',
    quiz: {
      question: 'European bison are herbivores. What do they mainly eat?',
      options: ['Meat', 'Grass and leaves', 'Fish', 'Nuts only'],
      correctAnswer: 1
    }
  },
  {
    id: 'qr-005',
    name: 'Ladybug',
    scientificName: 'Coccinellidae',
    type: 'insect',
    description: 'Ladybugs are beneficial insects that help control pest populations by eating aphids and other plant-damaging insects.',
    habitat: 'Gardens, fields, and forests',
    funFact: 'A single ladybug can eat up to 5,000 aphids in its lifetime!',
    imageUrl: 'https://images.unsplash.com/photo-1681505413560-aad767829b6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWR5YnVnJTIwaW5zZWN0JTIwbWFjcm98ZW58MXx8fHwxNzc2MjYyOTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rarity: 'common',
    quiz: {
      question: 'What do ladybugs eat?',
      options: ['Leaves', 'Aphids and small insects', 'Nectar', 'Wood'],
      correctAnswer: 1
    }
  },
  {
    id: 'qr-006',
    name: 'Gray Wolf',
    scientificName: 'Canis lupus',
    type: 'animal',
    description: 'Wolves are highly social animals that live in packs. They play a crucial role in maintaining ecosystem balance.',
    habitat: 'Forests, tundra, and grasslands',
    funFact: 'Wolves can communicate over 6 miles using howls!',
    imageUrl: 'https://images.unsplash.com/photo-1572008125457-15e3be61ce3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5JTIwd29sZiUyMG5hdHVyZXxlbnwxfHx8fDE3NzYyNjI5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rarity: 'legendary',
    quiz: {
      question: 'Wolves live and hunt in groups called:',
      options: ['Herds', 'Packs', 'Flocks', 'Schools'],
      correctAnswer: 1
    }
  },
  {
    id: 'qr-007',
    name: 'Pine Tree',
    scientificName: 'Pinus sylvestris',
    type: 'plant',
    description: 'Pine trees are evergreen conifers with needle-like leaves. They provide year-round shelter for many animals.',
    habitat: 'Forests and mountainous regions',
    funFact: 'Pine trees can live for over 1,000 years in the right conditions!',
    imageUrl: 'https://images.unsplash.com/photo-1644676654534-abc4f62ceee1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lJTIwdHJlZSUyMGZvcmVzdHxlbnwxfHx8fDE3NzYyNDM1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rarity: 'common',
    quiz: {
      question: 'What type of leaves do pine trees have?',
      options: ['Broad leaves', 'Needles', 'No leaves', 'Flowers'],
      correctAnswer: 1
    }
  },
  {
    id: 'qr-008',
    name: 'Red Deer',
    scientificName: 'Cervus elaphus',
    type: 'animal',
    description: 'Red deer are one of the largest deer species. Males grow impressive antlers that are shed and regrown each year.',
    habitat: 'Forests, moorlands, and grasslands',
    funFact: 'Male red deer can roar so loudly it can be heard over a mile away during mating season!',
    imageUrl: 'https://images.unsplash.com/photo-1757858849087-7095a55a0550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVyJTIwd2lsZGxpZmUlMjBmb3Jlc3R8ZW58MXx8fHwxNzc2MTk4ODQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rarity: 'uncommon',
    quiz: {
      question: 'What are the antlers on male deer used for?',
      options: ['Flying', 'Fighting and display', 'Digging', 'Swimming'],
      correctAnswer: 1
    }
  },
  {
    id: 'qr-009',
    name: 'Sunflower',
    scientificName: 'Helianthus annuus',
    type: 'plant',
    description: 'Sunflowers are known for their large flower heads that follow the sun across the sky, a behavior called heliotropism.',
    habitat: 'Fields, gardens, and meadows',
    funFact: 'Young sunflowers track the sun from east to west during the day!',
    imageUrl: 'https://images.unsplash.com/photo-1773077361469-cbead76c05f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5mbG93ZXIlMjBibG9vbSUyMGNsb3NlfGVufDF8fHx8MTc3NjI2Mjk2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rarity: 'uncommon',
    quiz: {
      question: 'Why do young sunflowers turn to face the sun?',
      options: ['To look pretty', 'For better growth and warmth', 'By accident', 'To scare birds'],
      correctAnswer: 1
    }
  },
  {
    id: 'qr-010',
    name: 'Dragonfly',
    scientificName: 'Anisoptera',
    type: 'insect',
    description: 'Dragonflies are ancient insects with incredible flying abilities. They can fly in all directions and even hover in place.',
    habitat: 'Near ponds, lakes, and wetlands',
    funFact: 'Dragonflies have been around for over 300 million years!',
    imageUrl: 'https://images.unsplash.com/photo-1718647507338-4dc7b6e6ff86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFnb25mbHklMjBpbnNlY3QlMjB3aW5nc3xlbnwxfHx8fDE3NzYyNjI5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rarity: 'rare',
    quiz: {
      question: 'What special flying ability do dragonflies have?',
      options: ['They can only fly forward', 'They can fly in all directions', 'They cannot fly', 'They only glide'],
      correctAnswer: 1
    }
  },
  {
    id: 'qr-011',
    name: 'European Lynx',
    scientificName: 'Lynx lynx',
    type: 'animal',
    description: 'The lynx is a medium-sized wild cat with distinctive tufted ears and a short tail. They are excellent climbers and hunters.',
    habitat: 'Dense forests and rocky areas',
    funFact: 'Lynx have such good hearing they can detect prey under snow!',
    imageUrl: 'https://images.unsplash.com/photo-1706119546333-59858cb5386c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGVhbiUyMGx5bnglMjB3aWxkfGVufDF8fHx8MTc3NjIwNTI3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rarity: 'legendary',
    quiz: {
      question: 'What distinctive feature do lynx have on their ears?',
      options: ['Nothing special', 'Black tufts', 'Feathers', 'Horns'],
      correctAnswer: 1
    }
  },
  {
    id: 'qr-012',
    name: 'Wild Rabbit',
    scientificName: 'Oryctolagus cuniculus',
    type: 'animal',
    description: 'Wild rabbits are social animals that live in underground burrow systems called warrens. They are herbivores and play an important role in the ecosystem.',
    habitat: 'Grasslands, meadows, and woodland edges',
    funFact: 'Rabbits can jump up to 3 feet high and 10 feet long!',
    imageUrl: 'https://images.unsplash.com/photo-1774625010223-16d426362b27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkJTIwcmFiYml0JTIwbmF0dXJlfGVufDF8fHx8MTc3NjI2Mjk2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rarity: 'common',
    quiz: {
      question: 'What is a rabbit\'s underground home called?',
      options: ['Den', 'Warren', 'Nest', 'Cave'],
      correctAnswer: 1
    }
  }
];

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  category: 'discovery' | 'quiz' | 'type' | 'rarity';
  type?: SpeciesType;
}

export const badges: Badge[] = [
  {
    id: 'first-discovery',
    name: 'First Steps',
    description: 'Discover your first species',
    icon: '🌟',
    requirement: 1,
    category: 'discovery'
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Discover 5 species',
    icon: '🔍',
    requirement: 5,
    category: 'discovery'
  },
  {
    id: 'naturalist',
    name: 'Naturalist',
    description: 'Discover 10 species',
    icon: '🎯',
    requirement: 10,
    category: 'discovery'
  },
  {
    id: 'master-explorer',
    name: 'Master Explorer',
    description: 'Discover all species',
    icon: '👑',
    requirement: 12,
    category: 'discovery'
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Answer 5 quizzes correctly',
    icon: '🧠',
    requirement: 5,
    category: 'quiz'
  },
  {
    id: 'animal-lover',
    name: 'Animal Lover',
    description: 'Discover 5 animals',
    icon: '🦊',
    requirement: 5,
    category: 'type',
    type: 'animal'
  },
  {
    id: 'plant-expert',
    name: 'Plant Expert',
    description: 'Discover 3 plants',
    icon: '🌳',
    requirement: 3,
    category: 'type',
    type: 'plant'
  },
  {
    id: 'bug-hunter',
    name: 'Bug Hunter',
    description: 'Discover 3 insects',
    icon: '🐛',
    requirement: 3,
    category: 'type',
    type: 'insect'
  },
  {
    id: 'legend-finder',
    name: 'Legend Finder',
    description: 'Find a legendary species',
    icon: '✨',
    requirement: 1,
    category: 'rarity'
  }
];
