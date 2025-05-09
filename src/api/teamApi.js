import { SALARY_CAPS } from '../config/gameRules';

// Mock player data
const generateMockPlayers = (sport) => {
  const players = [];
  
  if (sport === 'NFL') {
    // QBs
    players.push(
      { id: 'nfl-p1', name: 'Patrick Mahomes', team: 'KC', position: 'QB', salary: 9000, avgPoints: 25.3, status: 'ACTIVE' },
      { id: 'nfl-p2', name: 'Josh Allen', team: 'BUF', position: 'QB', salary: 8500, avgPoints: 24.1, status: 'ACTIVE' },
      { id: 'nfl-p3', name: 'Lamar Jackson', team: 'BAL', position: 'QB', salary: 8200, avgPoints: 23.8, status: 'ACTIVE' }
    );
    
    // RBs
    players.push(
      { id: 'nfl-p4', name: 'Christian McCaffrey', team: 'SF', position: 'RB', salary: 9200, avgPoints: 26.5, status: 'ACTIVE' },
      { id: 'nfl-p5', name: 'Derrick Henry', team: 'TEN', position: 'RB', salary: 8800, avgPoints: 22.7, status: 'ACTIVE' },
      { id: 'nfl-p6', name: 'Jonathan Taylor', team: 'IND', position: 'RB', salary: 8300, avgPoints: 20.9, status: 'ACTIVE' },
      { id: 'nfl-p7', name: 'Austin Ekeler', team: 'LAC', position: 'RB', salary: 7900, avgPoints: 19.5, status: 'ACTIVE' }
    );
    
    // WRs
    players.push(
      { id: 'nfl-p8', name: 'Justin Jefferson', team: 'MIN', position: 'WR', salary: 8900, avgPoints: 21.3, status: 'ACTIVE' },
      { id: 'nfl-p9', name: 'Tyreek Hill', team: 'MIA', position: 'WR', salary: 8700, avgPoints: 20.8, status: 'ACTIVE' },
      { id: 'nfl-p10', name: 'Ja\'Marr Chase', team: 'CIN', position: 'WR', salary: 8500, avgPoints: 19.7, status: 'ACTIVE' },
      { id: 'nfl-p11', name: 'Davante Adams', team: 'LV', position: 'WR', salary: 8300, avgPoints: 18.9, status: 'ACTIVE' },
      { id: 'nfl-p12', name: 'Stefon Diggs', team: 'BUF', position: 'WR', salary: 8100, avgPoints: 18.2, status: 'ACTIVE' }
    );
    
    // TEs
    players.push(
      { id: 'nfl-p13', name: 'Travis Kelce', team: 'KC', position: 'TE', salary: 7800, avgPoints: 17.5, status: 'ACTIVE' },
      { id: 'nfl-p14', name: 'Mark Andrews', team: 'BAL', position: 'TE', salary: 6500, avgPoints: 14.3, status: 'ACTIVE' }
    );
    
    // DEF
    players.push(
      { id: 'nfl-p15', name: 'San Francisco 49ers', team: 'SF', position: 'DEF', salary: 4000, avgPoints: 9.8, status: 'ACTIVE' },
      { id: 'nfl-p16', name: 'Dallas Cowboys', team: 'DAL', position: 'DEF', salary: 3800, avgPoints: 9.2, status: 'ACTIVE' }
    );
    
    // K
    players.push(
      { id: 'nfl-p17', name: 'Justin Tucker', team: 'BAL', position: 'K', salary: 3500, avgPoints: 8.7, status: 'ACTIVE' },
      { id: 'nfl-p18', name: 'Harrison Butker', team: 'KC', position: 'K', salary: 3300, avgPoints: 8.2, status: 'ACTIVE' }
    );
  } else if (sport === 'NBA') {
    // Guards
    players.push(
      { id: 'nba-p1', name: 'Stephen Curry', team: 'GSW', position: 'PG', salary: 9500, avgPoints: 48.7, status: 'ACTIVE' },
      { id: 'nba-p2', name: 'Luka Dončić', team: 'DAL', position: 'PG', salary: 10000, avgPoints: 55.3, status: 'ACTIVE' },
      { id: 'nba-p3', name: 'Damian Lillard', team: 'MIL', position: 'PG', salary: 8800, avgPoints: 45.2, status: 'ACTIVE' },
      { id: 'nba-p4', name: 'Devin Booker', team: 'PHX', position: 'SG', salary: 8500, avgPoints: 42.8, status: 'ACTIVE' },
      { id: 'nba-p5', name: 'Donovan Mitchell', team: 'CLE', position: 'SG', salary: 8200, avgPoints: 41.5, status: 'ACTIVE' }
    );
    
    // Forwards
    players.push(
      { id: 'nba-p6', name: 'LeBron James', team: 'LAL', position: 'SF', salary: 9800, avgPoints: 50.3, status: 'ACTIVE' },
      { id: 'nba-p7', name: 'Kevin Durant', team: 'PHX', position: 'SF', salary: 9600, avgPoints: 49.1, status: 'ACTIVE' },
      { id: 'nba-p8', name: 'Giannis Antetokounmpo', team: 'MIL', position: 'PF', salary: 10200, avgPoints: 56.7, status: 'ACTIVE' },
      { id: 'nba-p9', name: 'Jayson Tatum', team: 'BOS', position: 'PF', salary: 9300, avgPoints: 47.5, status: 'ACTIVE' }
    );
    
    // Centers
    players.push(
      { id: 'nba-p10', name: 'Nikola Jokić', team: 'DEN', position: 'C', salary: 10500, avgPoints: 58.9, status: 'ACTIVE' },
      { id: 'nba-p11', name: 'Joel Embiid', team: 'PHI', position: 'C', salary: 10300, avgPoints: 57.2, status: 'ACTIVE' },
      { id: 'nba-p12', name: 'Anthony Davis', team: 'LAL', position: 'C', salary: 9100, avgPoints: 46.8, status: 'ACTIVE' }
    );
  } else if (sport === 'MLB') {
    // Pitchers
    players.push(
      { id: 'mlb-p1', name: 'Shohei Ohtani', team: 'LAD', position: 'P', salary: 9800, avgPoints: 22.5, status: 'ACTIVE' },
      { id: 'mlb-p2', name: 'Gerrit Cole', team: 'NYY', position: 'P', salary: 9200, avgPoints: 20.8, status: 'ACTIVE' },
      { id: 'mlb-p3', name: 'Corbin Burnes', team: 'BAL', position: 'P', salary: 8900, avgPoints: 19.7, status: 'ACTIVE' }
    );
    
    // Catchers
    players.push(
      { id: 'mlb-p4', name: 'J.T. Realmuto', team: 'PHI', position: 'C', salary: 7500, avgPoints: 15.3, status: 'ACTIVE' },
      { id: 'mlb-p5', name: 'Adley Rutschman', team: 'BAL', position: 'C', salary: 7300, avgPoints: 14.8, status: 'ACTIVE' }
    );
    
    // First Basemen
    players.push(
      { id: 'mlb-p6', name: 'Vladimir Guerrero Jr.', team: 'TOR', position: '1B', salary: 8200, avgPoints: 17.5, status: 'ACTIVE' },
      { id: 'mlb-p7', name: 'Freddie Freeman', team: 'LAD', position: '1B', salary: 8000, avgPoints: 17.1, status: 'ACTIVE' }
    );
    
    // Second Basemen
    players.push(
      { id: 'mlb-p8', name: 'Marcus Semien', team: 'TEX', position: '2B', salary: 7800, avgPoints: 16.7, status: 'ACTIVE' },
      { id: 'mlb-p9', name: 'Jose Altuve', team: 'HOU', position: '2B', salary: 7600, avgPoints: 16.2, status: 'ACTIVE' }
    );
    
    // Third Basemen
    players.push(
      { id: 'mlb-p10', name: 'José Ramírez', team: 'CLE', position: '3B', salary: 8100, avgPoints: 17.3, status: 'ACTIVE' },
      { id: 'mlb-p11', name: 'Manny Machado', team: 'SD', position: '3B', salary: 7900, avgPoints: 16.9, status: 'ACTIVE' }
    );
    
    // Shortstops
    players.push(
      { id: 'mlb-p12', name: 'Bobby Witt Jr.', team: 'KC', position: 'SS', salary: 8300, avgPoints: 17.8, status: 'ACTIVE' },
      { id: 'mlb-p13', name: 'Francisco Lindor', team: 'NYM', position: 'SS', salary: 8100, avgPoints: 17.4, status: 'ACTIVE' }
    );
    
    // Outfielders
    players.push(
      { id: 'mlb-p14', name: 'Aaron Judge', team: 'NYY', position: 'OF', salary: 9500, avgPoints: 21.2, status: 'ACTIVE' },
      { id: 'mlb-p15', name: 'Juan Soto', team: 'NYY', position: 'OF', salary: 9300, avgPoints: 20.7, status: 'ACTIVE' },
      { id: 'mlb-p16', name: 'Ronald Acuña Jr.', team: 'ATL', position: 'OF', salary: 9100, avgPoints: 20.3, status: 'ACTIVE' },
      { id: 'mlb-p17', name: 'Mookie Betts', team: 'LAD', position: 'OF', salary: 8900, avgPoints: 19.8, status: 'ACTIVE' },
      { id: 'mlb-p18', name: 'Mike Trout', team: 'LAA', position: 'OF', salary: 8700, avgPoints: 19.4, status: 'ACTIVE' }
    );
  } else if (sport === 'NHL') {
    // Forwards
    players.push(
      { id: 'nhl-p1', name: 'Connor McDavid', team: 'EDM', position: 'FWD', salary: 9800, avgPoints: 18.5, status: 'ACTIVE' },
      { id: 'nhl-p2', name: 'Nathan MacKinnon', team: 'COL', position: 'FWD', salary: 9500, avgPoints: 17.8, status: 'ACTIVE' },
      { id: 'nhl-p3', name: 'Auston Matthews', team: 'TOR', position: 'FWD', salary: 9300, avgPoints: 17.2, status: 'ACTIVE' },
      { id: 'nhl-p4', name: 'Leon Draisaitl', team: 'EDM', position: 'FWD', salary: 9100, avgPoints: 16.9, status: 'ACTIVE' },
      { id: 'nhl-p5', name: 'Nikita Kucherov', team: 'TB', position: 'FWD', salary: 8900, avgPoints: 16.5, status: 'ACTIVE' },
      { id: 'nhl-p6', name: 'David Pastrnak', team: 'BOS', position: 'FWD', salary: 8700, avgPoints: 16.1, status: 'ACTIVE' }
    );
    
    // Defensemen
    players.push(
      { id: 'nhl-p7', name: 'Cale Makar', team: 'COL', position: 'DEF', salary: 8500, avgPoints: 15.7, status: 'ACTIVE' },
      { id: 'nhl-p8', name: 'Roman Josi', team: 'NSH', position: 'DEF', salary: 8200, avgPoints: 15.1, status: 'ACTIVE' },
      { id: 'nhl-p9', name: 'Adam Fox', team: 'NYR', position: 'DEF', salary: 8000, avgPoints: 14.8, status: 'ACTIVE' },
      { id: 'nhl-p10', name: 'Victor Hedman', team: 'TB', position: 'DEF', salary: 7800, avgPoints: 14.4, status: 'ACTIVE' }
    );
    
    // Goalies
    players.push(
      { id: 'nhl-p11', name: 'Andrei Vasilevskiy', team: 'TB', position: 'G', salary: 8400, avgPoints: 15.5, status: 'ACTIVE' },
      { id: 'nhl-p12', name: 'Igor Shesterkin', team: 'NYR', position: 'G', salary: 8200, avgPoints: 15.2, status: 'ACTIVE' },
      { id: 'nhl-p13', name: 'Connor Hellebuyck', team: 'WPG', position: 'G', salary: 8000, avgPoints: 14.9, status: 'ACTIVE' }
    );
  } else if (sport === 'MLS') {
    // Goalkeepers
    players.push(
      { id: 'mls-p1', name: 'Andre Blake', team: 'PHI', position: 'GK', salary: 7500, avgPoints: 12.5, status: 'ACTIVE' },
      { id: 'mls-p2', name: 'Maarten Paes', team: 'DAL', position: 'GK', salary: 7200, avgPoints: 11.8, status: 'ACTIVE' }
    );
    
    // Defenders
    players.push(
      { id: 'mls-p3', name: 'Walker Zimmerman', team: 'NSH', position: 'DEF', salary: 7800, avgPoints: 13.2, status: 'ACTIVE' },
      { id: 'mls-p4', name: 'Kai Wagner', team: 'PHI', position: 'DEF', salary: 7600, avgPoints: 12.9, status: 'ACTIVE' },
      { id: 'mls-p5', name: 'Aaron Long', team: 'LAG', position: 'DEF', salary: 7400, avgPoints: 12.5, status: 'ACTIVE' },
      { id: 'mls-p6', name: 'Alexander Callens', team: 'NYC', position: 'DEF', salary: 7200, avgPoints: 12.1, status: 'ACTIVE' },
      { id: 'mls-p7', name: 'Miles Robinson', team: 'ATL', position: 'DEF', salary: 7000, avgPoints: 11.8, status: 'ACTIVE' },
      { id: 'mls-p8', name: 'Yeimar Gómez', team: 'SEA', position: 'DEF', salary: 6800, avgPoints: 11.4, status: 'ACTIVE' }
    );
    
    // Midfielders
    players.push(
      { id: 'mls-p9', name: 'Hany Mukhtar', team: 'NSH', position: 'MID', salary: 9200, avgPoints: 16.5, status: 'ACTIVE' },
      { id: 'mls-p10', name: 'Luciano Acosta', team: 'CIN', position: 'MID', salary: 9000, avgPoints: 16.1, status: 'ACTIVE' },
      { id: 'mls-p11', name: 'Carles Gil', team: 'NE', position: 'MID', salary: 8800, avgPoints: 15.7, status: 'ACTIVE' },
      { id: 'mls-p12', name: 'Thiago Almada', team: 'ATL', position: 'MID', salary: 8600, avgPoints: 15.3, status: 'ACTIVE' },
      { id: 'mls-p13', name: 'Darlington Nagbe', team: 'CLB', position: 'MID', salary: 8400, avgPoints: 14.9, status: 'ACTIVE' }
    );
    
    // Forwards
    players.push(
      { id: 'mls-p14', name: 'Lionel Messi', team: 'MIA', position: 'FWD', salary: 9800, avgPoints: 18.5, status: 'ACTIVE' },
      { id: 'mls-p15', name: 'Denis Bouanga', team: 'LAFC', position: 'FWD', salary: 9500, avgPoints: 17.8, status: 'ACTIVE' },
      { id: 'mls-p16', name: 'Christian Benteke', team: 'DC', position: 'FWD', salary: 9200, avgPoints: 17.2, status: 'ACTIVE' },
      { id: 'mls-p17', name: 'Cucho Hernández', team: 'CLB', position: 'FWD', salary: 9000, avgPoints: 16.8, status: 'ACTIVE' },
      { id: 'mls-p18', name: 'Luis Suárez', team: 'MIA', position: 'FWD', salary: 8800, avgPoints: 16.4, status: 'ACTIVE' }
    );
  }
  
  return players;
};

// Get available players for a contest
export const getAvailablePlayers = async (contestId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Determine sport based on contestId prefix
  let sport = 'NFL';
  if (contestId.startsWith('nba')) {
    sport = 'NBA';
  } else if (contestId.startsWith('mlb')) {
    sport = 'MLB';
  } else if (contestId.startsWith('nhl')) {
    sport = 'NHL';
  } else if (contestId.startsWith('mls')) {
    sport = 'MLS';
  }
  
  return {
    players: generateMockPlayers(sport),
    salaryCap: SALARY_CAPS[sport] || 50000
  };
};

// Create a team entry
export const createTeamEntry = async (contestId, playerIds) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // In a real app, this would send the team to the server
  console.log(`Created team for contest ${contestId} with players:`, playerIds);
  
  return { success: true, teamId: `team-${Date.now()}` };
};

// Get user's teams
export const getUserTeams = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock user teams
  return [
    {
      id: 'team1',
      contestId: 'nfl1',
      contestName: 'Sunday Million',
      sport: 'NFL',
      entryFee: 20,
      score: 142.5,
      rank: 356,
      totalEntrants: 3500,
      startTime: new Date(Date.now() + 86400000).toISOString(),
      status: 'UPCOMING'
    },
    {
      id: 'team2',
      contestId: 'nba1',
      contestName: 'NBA Slam Dunk',
      sport: 'NBA',
      entryFee: 10,
      score: 287.3,
      rank: 125,
      totalEntrants: 2500,
      startTime: new Date(Date.now() - 86400000).toISOString(),
      status: 'LIVE'
    },
    {
      id: 'team3',
      contestId: 'mlb1',
      contestName: 'MLB Home Run Derby',
      sport: 'MLB',
      entryFee: 15,
      score: 95.8,
      rank: 78,
      totalEntrants: 1800,
      startTime: new Date(Date.now() - 172800000).toISOString(),
      status: 'COMPLETED'
    },
    {
      id: 'team4',
      contestId: 'nhl1',
      contestName: 'NHL Face-Off',
      sport: 'NHL',
      entryFee: 5,
      score: 112.4,
      rank: 42,
      totalEntrants: 1200,
      startTime: new Date(Date.now() + 259200000).toISOString(),
      status: 'UPCOMING'
    },
    {
      id: 'team5',
      contestId: 'mls1',
      contestName: 'MLS Cup Challenge',
      sport: 'MLS',
      entryFee: 8,
      score: 78.2,
      rank: 215,
      totalEntrants: 950,
      startTime: new Date(Date.now() + 172800000).toISOString(),
      status: 'UPCOMING'
    }
  ];
}; 