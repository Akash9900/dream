// Team composition requirements for each sport
export const TEAM_REQUIREMENTS = {
  NFL: {
    requiredPlayers: 9,
    backupPlayers: 3,
    total: 12,
    format: "QB–2RB–2WR–TE–FLEX–DEF–K",
    positionLimits: {
      QB: { min: 1, max: 2 },
      RB: { min: 2, max: 4 },
      WR: { min: 2, max: 4 },
      TE: { min: 1, max: 2 },
      FLEX: { min: 1, max: 1 }, // FLEX can be RB/WR/TE
      DEF: { min: 1, max: 1 },
      K: { min: 1, max: 1 }
    }
  },
  NBA: {
    requiredPlayers: 5,
    backupPlayers: 3,
    total: 8,
    format: "2G–2F–1C",
    positionLimits: {
      G: { min: 2, max: 3 }, // Guards (PG/SG)
      F: { min: 2, max: 3 }, // Forwards (SF/PF)
      C: { min: 1, max: 2 }  // Centers
    }
  },
  MLB: {
    requiredPlayers: 9,
    backupPlayers: 3,
    total: 12,
    format: "P–C–1B–2B–3B–SS–3OF",
    positionLimits: {
      P: { min: 1, max: 2 },
      C: { min: 1, max: 1 },
      '1B': { min: 1, max: 1 },
      '2B': { min: 1, max: 1 },
      '3B': { min: 1, max: 1 },
      SS: { min: 1, max: 1 },
      OF: { min: 3, max: 5 } // OF1, OF2, OF3 treated separately
    }
  },
  NHL: {
    requiredPlayers: 6,
    backupPlayers: 2,
    total: 8,
    format: "3FWD–2DEF–1G",
    positionLimits: {
      FWD: { min: 3, max: 4 }, // Forwards
      DEF: { min: 2, max: 3 }, // Defensemen
      G: { min: 1, max: 1 }    // Goalie
    }
  },
  MLS: {
    requiredPlayers: 11,
    backupPlayers: 3,
    total: 14,
    format: "4–3–3",
    positionLimits: {
      GK: { min: 1, max: 1 },  // Goalkeeper
      DEF: { min: 4, max: 5 }, // Defenders
      MID: { min: 3, max: 4 }, // Midfielders
      FWD: { min: 3, max: 4 }  // Forwards
    }
  }
}; 