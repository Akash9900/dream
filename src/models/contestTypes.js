const CONTEST_TYPES = {
  FREE: {
    entryFee: 0,
    requiresVerification: false,
    maxEntries: 1
  },
  PAID_SINGLE: {
    entryFee: [1, 2, 5, 10, 20, 50],
    requiresVerification: true,
    maxEntries: 1
  },
  PAID_MULTI: {
    entryFee: [1, 2, 5, 10, 20],
    requiresVerification: true,
    maxEntries: 20
  },
  HEAD_TO_HEAD: {
    entryFee: [1, 2, 5, 10, 20, 50, 100],
    requiresVerification: true,
    maxEntries: 1,
    exactPlayers: 2
  },
  // ... other contest types
};

export default CONTEST_TYPES; 