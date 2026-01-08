import { HandPhase, LetterGroup, LeaderboardEntry } from './types';

export const ALPHABET_GROUPS: LetterGroup[] = [
  {
    id: 'phase-1',
    name: 'The Anchors',
    phase: HandPhase.FIST_VARIANTS,
    letters: ['A', 'S', 'E', 'T', 'M', 'N'],
    description: 'Master thumb placement and closed fist variations.'
  },
  {
    id: 'phase-2',
    name: 'The Extensions',
    phase: HandPhase.EXTENSIONS,
    letters: ['D', 'I', 'U', 'R', 'K', 'V', 'W'],
    description: 'Vertical finger extensions and independence.'
  },
  {
    id: 'phase-3',
    name: 'Open & Flat',
    phase: HandPhase.OPEN_FLAT,
    letters: ['B', 'C', 'F', 'O', 'L', 'Y'],
    description: 'Hand opening and circular shapes.'
  },
  {
    id: 'phase-4',
    name: 'Motion',
    phase: HandPhase.MOTION_ORIENTATION,
    letters: ['G', 'H', 'P', 'Q', 'J', 'Z'],
    description: 'Wrist rotation and motion in space.'
  }
];

export const MOCK_WORD_LIST = [
  "TEA", "SEA", "EAT", "TATE", "MEET", "NAME", "SEAM", "TEAM", "MAT", "SAT", "MAN"
];

// Placeholder for images
export const HAND_PLACEHOLDER_URL = "https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3"; 

// Enhanced mock data to match visual reference
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { 
    rank: 1, 
    name: "Sarah Connor", 
    streak: 45, 
    xp: 1240, 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4", 
    status: "LEAGUE LEADER",
    changeDirection: "up",
    changeAmount: 2
  },
  { 
    rank: 2, 
    name: "Mike K.", 
    streak: 32, 
    xp: 1150, 
    avatar: "MK",
    changeDirection: "same"
  },
  { 
    rank: 3, 
    name: "Jenny L.", 
    streak: 18, 
    xp: 980, 
    avatar: "JL",
    changeDirection: "up",
    changeAmount: 1
  },
  { rank: 4, name: "Marcus P.", streak: 12, xp: 850, avatar: "MP" },
  { rank: 5, name: "Alex T.", streak: 8, xp: 720, avatar: "AT" },
  { rank: 6, name: "Jordan B.", streak: 4, xp: 650, avatar: "JB" },
  { rank: 7, name: "Taylor S.", streak: 10, xp: 590, avatar: "TS" },
  { 
    rank: 8, 
    name: "Alex Doe", 
    streak: 15, 
    xp: 450, 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", 
    isUser: true,
    status: "YOU",
    changeDirection: "up",
    changeAmount: 3
  },
  { rank: 9, name: "Guest_882", streak: 2, xp: 420, avatar: "G2" },
  { rank: 10, name: "Riley M.", streak: 1, xp: 380, avatar: "RM" },
];

export const LETTER_VIDEOS: Record<string, string> = {
  'A': 'https://videos-asl.lingvano.com/9099-480p.mp4',
  'B': 'https://videos-asl.lingvano.com/9101-480p.mp4',
  'C': 'https://videos-asl.lingvano.com/9102-480p.mp4',
  'D': 'https://videos-asl.lingvano.com/9133-480p.mp4',
  'E': 'https://videos-asl.lingvano.com/9103-480p.mp4',
  'F': 'https://videos-asl.lingvano.com/9131-480p.mp4',
  'G': 'https://videos-asl.lingvano.com/9126-480p.mp4',
  'H': 'https://videos-asl.lingvano.com/9132-480p.mp4',
  'I': 'https://videos-asl.lingvano.com/9115-480p.mp4',
  'J': 'https://videos-asl.lingvano.com/9127-480p.mp4',
  'K': 'https://videos-asl.lingvano.com/9111-480p.mp4',
  'L': 'https://videos-asl.lingvano.com/9134-480p.mp4',
  'M': 'https://videos-asl.lingvano.com/9113-480p.mp4',
  'N': 'https://videos-asl.lingvano.com/9108-480p.mp4',
  'O': 'https://videos-asl.lingvano.com/9109-480p.mp4',
  'P': 'https://videos-asl.lingvano.com/9112-480p.mp4',
  'Q': 'https://videos-asl.lingvano.com/9124-480p.mp4',
  'R': 'https://videos-asl.lingvano.com/9122-480p.mp4',
  'S': 'https://videos-asl.lingvano.com/9125-480p.mp4',
  'T': 'https://videos-asl.lingvano.com/9120-480p.mp4',
  'U': 'https://videos-asl.lingvano.com/9118-480p.mp4',
  'V': 'https://videos-asl.lingvano.com/9130-480p.mp4',
  'W': 'https://videos-asl.lingvano.com/9116-480p.mp4',
  'X': 'https://videos-asl.lingvano.com/9119-480p.mp4',
  'Y': 'https://videos-asl.lingvano.com/9128-480p.mp4',
  'Z': 'https://videos-asl.lingvano.com/9129-480p.mp4'
};