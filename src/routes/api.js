import express from 'express';
import { authenticateUser } from '../middleware/auth';
import * as UserController from '../controllers/userController';
import * as ContestController from '../controllers/contestController';
import * as TeamController from '../controllers/teamController';
import * as PaymentController from '../controllers/paymentController';

const router = express.Router();

// Authentication routes
router.post('/auth/register', UserController.register);
router.post('/auth/login', UserController.login);
router.post('/auth/verify-otp', UserController.verifyOTP);

// User routes
router.get('/user/profile', authenticateUser, UserController.getProfile);
router.put('/user/profile', authenticateUser, UserController.updateProfile);
router.get('/user/wallet', authenticateUser, UserController.getWallet);
router.get('/user/transactions', authenticateUser, UserController.getTransactions);

// Contest routes
router.get('/contests', authenticateUser, ContestController.getContests);
router.get('/contests/:id', authenticateUser, ContestController.getContestDetails);
router.get('/contests/:id/leaderboard', authenticateUser, ContestController.getLeaderboard);

// Team routes
router.post('/teams', authenticateUser, TeamController.createTeam);
router.get('/teams', authenticateUser, TeamController.getUserTeams);
router.get('/teams/:id', authenticateUser, TeamController.getTeamDetails);
router.put('/teams/:id', authenticateUser, TeamController.updateTeam);

// Payment routes
router.post('/payments/deposit', authenticateUser, PaymentController.initiateDeposit);
router.post('/payments/withdraw', authenticateUser, PaymentController.initiateWithdrawal);
router.get('/payments/methods', authenticateUser, PaymentController.getPaymentMethods);

export default router; 