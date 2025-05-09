// Mock data for contests
const MOCK_SPORTS = [
  { id: 'NFL', name: 'Football', icon: '🏈', active: true },
  { id: 'NBA', name: 'Basketball', icon: '🏀', active: true },
  { id: 'MLB', name: 'Baseball', icon: '⚾', active: true },
  { id: 'NHL', name: 'Hockey', icon: '🏒', active: true },
  { id: 'MLS', name: 'Soccer', icon: '⚽', active: true }
];

const MOCK_CONTESTS = {
  NFL: [
    {
      id: 'nfl1',
      name: 'Sunday Million',
      entryFee: 20,
      prizePool: 1000000,
      entrants: 3500,
      maxEntrants: 5000,
      startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      endTime: new Date(Date.now() + 172800000).toISOString(),  // Day after tomorrow
      games: [
        { homeTeam: 'KC Chiefs', awayTeam: 'SF 49ers', time: '1:00 PM' },
        { homeTeam: 'GB Packers', awayTeam: 'CHI Bears', time: '4:25 PM' },
        { homeTeam: 'DAL Cowboys', awayTeam: 'PHI Eagles', time: '8:20 PM' }
      ]
    },
    {
      id: 'nfl2',
      name: 'Thursday Night Showdown',
      entryFee: 5,
      prizePool: 100000,
      entrants: 1200,
      maxEntrants: 2000,
      startTime: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
      endTime: new Date(Date.now() + 345600000).toISOString(),   // 4 days from now
      games: [
        { homeTeam: 'BAL Ravens', awayTeam: 'CIN Bengals', time: '8:20 PM' }
      ]
    }
  ],
  NBA: [
    {
      id: 'nba1',
      name: 'NBA Slam Dunk',
      entryFee: 10,
      prizePool: 500000,
      entrants: 2500,
      maxEntrants: 4000,
      startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      endTime: new Date(Date.now() + 172800000).toISOString(),  // Day after tomorrow
      games: [
        { homeTeam: 'LA Lakers', awayTeam: 'BOS Celtics', time: '7:30 PM' },
        { homeTeam: 'GS Warriors', awayTeam: 'BKN Nets', time: '10:00 PM' }
      ]
    }
  ],
  MLB: [
    {
      id: 'mlb1',
      name: 'MLB Grand Slam',
      entryFee: 15,
      prizePool: 300000,
      entrants: 1800,
      maxEntrants: 3000,
      startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      endTime: new Date(Date.now() + 172800000).toISOString(),  // Day after tomorrow
      games: [
        { homeTeam: 'NY Yankees', awayTeam: 'BOS Red Sox', time: '7:05 PM' },
        { homeTeam: 'LA Dodgers', awayTeam: 'SF Giants', time: '10:10 PM' }
      ]
    }
  ],
  NHL: [
    {
      id: 'nhl1',
      name: 'NHL Hat Trick',
      entryFee: 8,
      prizePool: 200000,
      entrants: 1500,
      maxEntrants: 2500,
      startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      endTime: new Date(Date.now() + 172800000).toISOString(),  // Day after tomorrow
      games: [
        { homeTeam: 'TOR Maple Leafs', awayTeam: 'MTL Canadiens', time: '7:00 PM' },
        { homeTeam: 'VGK Golden Knights', awayTeam: 'COL Avalanche', time: '10:00 PM' }
      ]
    }
  ],
  MLS: [
    {
      id: 'mls1',
      name: 'MLS Goal Rush',
      entryFee: 5,
      prizePool: 100000,
      entrants: 1000,
      maxEntrants: 2000,
      startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      endTime: new Date(Date.now() + 172800000).toISOString(),  // Day after tomorrow
      games: [
        { homeTeam: 'LA Galaxy', awayTeam: 'LAFC', time: '8:00 PM' },
        { homeTeam: 'Seattle Sounders', awayTeam: 'Portland Timbers', time: '10:00 PM' }
      ]
    }
  ]
};

// Get all available sports
export const getSports = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_SPORTS;
};

// Get upcoming contests for a specific sport
export const getUpcomingContests = async (sportId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return MOCK_CONTESTS[sportId] || [];
};

// Get details for a specific contest
export const getContestDetails = async (contestId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Find the contest in our mock data
  for (const sport in MOCK_CONTESTS) {
    const contest = MOCK_CONTESTS[sport].find(c => c.id === contestId);
    if (contest) {
      return {
        ...contest,
        sport,
        entryCount: contest.entrants,
        maxEntries: contest.maxEntrants,
        payoutStructure: [
          { position: '1st', amount: contest.prizePool * 0.2 },
          { position: '2nd', amount: contest.prizePool * 0.1 },
          { position: '3rd', amount: contest.prizePool * 0.05 },
          { position: '4th-10th', amount: contest.prizePool * 0.02 },
          { position: '11th-100th', amount: contest.prizePool * 0.005 }
        ]
      };
    }
  }
  
  throw new Error('Contest not found');
};

// Get leaderboard for a specific contest
export const getLeaderboard = async (contestId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Generate mock leaderboard data
  const entries = [];
  for (let i = 1; i <= 100; i++) {
    entries.push({
      id: `entry${i}`,
      username: `user${i}`,
      teamName: `Team ${i}`,
      score: Math.floor(Math.random() * 200),
      rank: i
    });
  }
  
  // Sort by score descending
  entries.sort((a, b) => b.score - a.score);
  
  // Update ranks
  entries.forEach((entry, index) => {
    entry.rank = index + 1;
  });
  
  return entries;
}; 