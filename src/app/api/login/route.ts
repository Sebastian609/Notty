// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@/Service/Notty-API/getSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const session = await getSession(username, password);

      if (Object.keys(session).length > 0) {
        // Dummy authentication logic
        // In a real app, you would typically generate a session token or JWT here
        const userId = session.userId; // Adjust as per your session data structure

        // Set cookie (for demo purposes; consider secure cookies and httpOnly flags in production)
        res.setHeader('Set-Cookie', `idUser=${userId}; Path=/; HttpOnly`);

        res.status(200).json({ success: true, session });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
