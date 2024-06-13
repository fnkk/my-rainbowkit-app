import { getSession, destroySession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  // Destroy the session
  destroySession(req, res, () => {
    res.status(200).json({ message: 'Logged out' });
  });
}