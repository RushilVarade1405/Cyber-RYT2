import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@cyberryt.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    email: ADMIN_EMAIL,
    isAdmin: true,
    token: generateToken('admin'),
  });
};

export const getProfile = (req: any, res: Response) => {
  res.json({ email: ADMIN_EMAIL, isAdmin: true });
};