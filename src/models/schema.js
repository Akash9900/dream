// MongoDB Schema Examples

// User Schema
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'USA' }
  },
  wallet: {
    balance: { type: Number, default: 0 },
    transactions: [{
      amount: Number,
      type: { type: String, enum: ['DEPOSIT', 'WITHDRAWAL', 'CONTEST_ENTRY', 'CONTEST_WINNINGS'] },
      timestamp: { type: Date, default: Date.now },
      description: String,
      status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED'] }
    }]
  },
  verificationStatus: { type: String, enum: ['UNVERIFIED', 'PENDING', 'VERIFIED'] },
  createdAt: { type: Date, default: Date.now }
});

// Contest Schema
const ContestSchema = new Schema({
  name: { type: String, required: true },
  sport: { type: String, enum: ['NFL', 'NBA', 'MLB', 'NHL', 'MLS'], required: true },
  contestType: { type: String, required: true },
  entryFee: { type: Number, required: true },
  prizePool: { type: Number, required: true },
  maxEntries: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  entries: [{ type: Schema.Types.ObjectId, ref: 'Entry' }],
  status: { type: String, enum: ['UPCOMING', 'LIVE', 'COMPLETED'], default: 'UPCOMING' },
  payoutStructure: [{
    position: { type: String, required: true }, // e.g., "1st", "2nd-5th"
    amount: { type: Number, required: true }
  }]
});

// Team Entry Schema
const EntrySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contest: { type: Schema.Types.ObjectId, ref: 'Contest', required: true },
  players: [{
    player: { type: Schema.Types.ObjectId, ref: 'Player' },
    position: { type: String, required: true }
  }],
  totalSalary: { type: Number, required: true },
  score: { type: Number, default: 0 },
  rank: { type: Number },
  createdAt: { type: Date, default: Date.now }
}); 