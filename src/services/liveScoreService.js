import axios from 'axios';
import { SPORTS_DATA_API_KEY } from '../config/keys';

// Base URLs for different sports APIs
const API_ENDPOINTS = {
  NFL: 'https://api.sportsdata.io/v3/nfl/stats/json',
  NBA: 'https://api.sportsdata.io/v3/nba/stats/json',
  MLB: 'https://api.sportsdata.io/v3/mlb/stats/json',
  NHL: 'https://api.sportsdata.io/v3/nhl/stats/json',
  MLS: 'https://api.sportsdata.io/v3/soccer/stats/json'
};

// Cache for storing live scores to reduce API calls
const scoreCache = {
  data: {},
  timestamp: {}
};

// Get live scores for a specific sport
export async function getLiveScores(sport) {
  // Check cache first (refresh every 60 seconds)
  const now = Date.now();
  if (
    scoreCache.data[sport] && 
    scoreCache.timestamp[sport] && 
    now - scoreCache.timestamp[sport] < 60000
  ) {
    return scoreCache.data[sport];
  }
  
  try {
    const endpoint = `${API_ENDPOINTS[sport]}/LiveGameStats`;
    const response = await axios.get(endpoint, {
      params: { key: SPORTS_DATA_API_KEY }
    });
    
    // Update cache
    scoreCache.data[sport] = response.data;
    scoreCache.timestamp[sport] = now;
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching live scores for ${sport}:`, error);
    throw error;
  }
}

// Get player stats for a specific game
export async function getPlayerStats(sport, gameId) {
  try {
    const endpoint = `${API_ENDPOINTS[sport]}/PlayerGameStatsByGame/${gameId}`;
    const response = await axios.get(endpoint, {
      params: { key: SPORTS_DATA_API_KEY }
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching player stats for game ${gameId}:`, error);
    throw error;
  }
}

// Calculate fantasy points based on player stats and scoring rules
export function calculateFantasyPoints(player, sport) {
  // Import scoring rules for the specific sport
  const scoringRules = require(`../config/scoring/${sport.toLowerCase()}`);
  
  let points = 0;
  
  // Apply scoring rules based on player stats
  // This will vary by sport
  if (sport === 'NFL') {
    points += (player.PassingYards || 0) * scoringRules.passing.yards;
    points += (player.PassingTouchdowns || 0) * scoringRules.passing.touchdown;
    points += (player.PassingInterceptions || 0) * scoringRules.passing.interception;
    // ... other stats
  } else if (sport === 'NBA') {
    points += (player.Points || 0) * scoringRules.points;
    points += (player.Rebounds || 0) * scoringRules.rebounds;
    points += (player.Assists || 0) * scoringRules.assists;
    // ... other stats
  }
  // ... handle other sports
  
  return points;
} 