import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'worst-movie-secret';

export function generateTestToken() {
  return jwt.sign(
    { user: 'test' },
    SECRET,
    { expiresIn: '1h' }
  );
}
