import { getStateFromCoordinates } from './geolocation';

// States where paid fantasy sports are legal
const LEGAL_PAID_STATES = [
  'AL', 'AK', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 
  // ... other states
];

// States with specific tax requirements
const SPECIAL_TAX_STATES = {
  'NY': { withholding: 0.0897 },
  'PA': { withholding: 0.0307 },
  // ... other states with special requirements
};

export async function checkUserEligibility(user, contestType) {
  const userState = await getStateFromCoordinates(user.latitude, user.longitude);
  
  // Check if paid contests are allowed in user's state
  if (contestType.entryFee > 0 && !LEGAL_PAID_STATES.includes(userState)) {
    return {
      eligible: false,
      reason: `Paid contests are not available in ${userState}`
    };
  }
  
  // Check age requirements
  if (user.age < 18 || (userState === 'AL' && user.age < 19)) {
    return {
      eligible: false,
      reason: 'You must be of legal age to participate'
    };
  }
  
  return { eligible: true };
} 