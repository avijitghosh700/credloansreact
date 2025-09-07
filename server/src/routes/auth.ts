/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const router = Router();
const prisma = new PrismaClient();

// In-memory JWT blacklist
const tokenBlacklist = new Set<string>();
// In-memory refresh token store (userId -> refreshToken)
const refreshTokens = new Map<number, string>();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  // Access token: short-lived
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'secret',
    {
      expiresIn: '15m',
    },
  );
  // Refresh token: long-lived
  const refreshToken = crypto.randomBytes(40).toString('hex');
  refreshTokens.set(user.id, refreshToken);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });
  return res.json({ accessToken });
});

// Register route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: 'Email already registered.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { firstName, lastName, email, password: hashedPassword },
  });
  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email },
    process.env.JWT_SECRET || 'secret',
    {
      expiresIn: '1h',
    },
  );
  return res.status(201).json({ token });
});

// Forgot password: Step 1 - Confirm email
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: 'Email not found.' });
  }
  // In a real app, send OTP or link. Here, just confirm email exists.
  return res.json({
    message: 'Email confirmed. You may now reset your password.',
  });
});

// Forgot password: Step 2 - Set new password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ error: 'Email and new password are required.' });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: 'Email not found.' });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });
  return res.json({ message: 'Password has been reset successfully.' });
});

// Logout route
router.post('/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  const refreshToken = req.cookies?.refreshToken;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    tokenBlacklist.add(token);
  }
  if (refreshToken) {
    // Remove refresh token from store
    for (const [userId, token] of refreshTokens.entries()) {
      if (token === refreshToken) {
        refreshTokens.delete(userId);
        break;
      }
    }
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
  }
  return res.json({ message: 'Logged out successfully.' });
});
// Refresh endpoint
router.post('/refresh', (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token provided' });
  }
  // Find user by refresh token
  const userId = Array.from(refreshTokens.entries()).find(
    ([_, token]) => token === refreshToken,
  )?.[0];
  if (!userId) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
  // Issue new access token
  const user = { id: userId };
  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || 'secret',
    {
      expiresIn: '15m',
    },
  );
  // Optionally rotate refresh token
  const newRefreshToken = crypto.randomBytes(40).toString('hex');
  refreshTokens.set(user.id, newRefreshToken);
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
  return res.json({ accessToken });
});

// Protected route example (with blacklist check)
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ error: 'Token has been logged out' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      userId: number;
    };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        loans: true,
      },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ user });
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
