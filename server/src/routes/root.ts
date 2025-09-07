import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    message: 'Welcome to the Credit Dashboard & Loan Management API.',
    health: 'OK',
  });
});

// Future: Add routes for /auth, /users, /loans, /repayments, etc.

export default router;
