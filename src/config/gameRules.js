// Example configuration for NFL scoring
const NFL_SCORING = {
  passing: {
    yards: 0.04,      // 1 point per 25 yards
    touchdown: 4,
    interception: -1
  },
  rushing: {
    yards: 0.1,       // 1 point per 10 yards
    touchdown: 6
  },
  receiving: {
    yards: 0.1,       // 1 point per 10 yards
    touchdown: 6,
    reception: 0.5    // PPR (Point Per Reception)
  },
  kicking: {
    fieldGoal: 3,
    extraPoint: 1
  },
  defense: {
    sack: 1,
    interception: 2,
    fumbleRecovery: 2,
    touchdown: 6,
    safety: 2,
    pointsAllowed0: 10,
    pointsAllowed1To6: 7,
    pointsAllowed7To13: 4,
    pointsAllowed14To20: 1,
    pointsAllowed21To27: 0,
    pointsAllowed28To34: -1,
    pointsAllowed35Plus: -4
  }
};

// NBA scoring
const NBA_SCORING = {
  points: 1,
  rebounds: 1.2,
  assists: 1.5,
  steals: 2,
  blocks: 2,
  turnovers: -0.5,
  threePointers: 0.5,
  doubleDouble: 1.5,  // bonus for double-double
  tripleDouble: 3     // bonus for triple-double
};

// MLB scoring
const MLB_SCORING = {
  batting: {
    single: 3,
    double: 5,
    triple: 8,
    homeRun: 10,
    rbi: 2,
    run: 2,
    baseOnBalls: 2,
    stolenBase: 5
  },
  pitching: {
    inningPitched: 2.25,
    strikeout: 2,
    win: 4,
    save: 5,
    earnedRun: -2,
    hit: -0.6,
    baseOnBalls: -0.6
  }
};

// NHL scoring
const NHL_SCORING = {
  goal: 3,
  assist: 2,
  shotOnGoal: 0.5,
  blockedShot: 0.5,
  shortHandedPoint: 1, // bonus
  gameWinningGoal: 1,  // bonus
  goalie: {
    win: 3,
    save: 0.2,
    shutout: 3,
    goalAgainst: -1
  }
};

// MLS scoring
const MLS_SCORING = {
  goal: 10,
  assist: 6,
  shotOnTarget: 1,
  crossesSuccessful: 0.7,
  passesSuccessful: 0.02,
  tacklesWon: 1,
  interception: 0.5,
  clearance: 0.5,
  blockedShot: 0.5,
  goalie: {
    save: 2,
    cleanSheet: 5,
    penaltySave: 5,
    goalConceded: -2
  }
};

export const SCORING = {
  NFL: NFL_SCORING,
  NBA: NBA_SCORING,
  MLB: MLB_SCORING,
  NHL: NHL_SCORING,
  MLS: MLS_SCORING
};

export const SALARY_CAPS = {
  NFL: 50000,
  NBA: 50000,
  MLB: 45000,
  NHL: 50000,
  MLS: 40000
};

export const ROSTER_POSITIONS = {
  NFL: ['QB', 'RB', 'RB', 'WR', 'WR', 'WR', 'TE', 'FLEX', 'DST'],
  NBA: ['PG', 'SG', 'SF', 'PF', 'C', 'G', 'F', 'UTIL'],
  MLB: ['P', 'P', 'C', '1B', '2B', '3B', 'SS', 'OF', 'OF', 'OF'],
  NHL: ['C', 'C', 'W', 'W', 'W', 'D', 'D', 'G', 'UTIL'],
  MLS: ['GK', 'D', 'D', 'D', 'M', 'M', 'M', 'F', 'F']
};

export const POSITION_LIMITS = {
  NFL: { QB: 1, RB: 3, WR: 4, TE: 2, K: 1, DST: 1, FLEX: 1 },
  NBA: { PG: 2, SG: 2, SF: 2, PF: 2, C: 2, G: 1, F: 1, UTIL: 1 },
  MLB: { P: 2, C: 1, '1B': 1, '2B': 1, '3B': 1, SS: 1, OF: 3 },
  NHL: { C: 2, W: 3, D: 2, G: 1, UTIL: 1 },
  MLS: { GK: 1, D: 3, M: 3, F: 2 }
}; 