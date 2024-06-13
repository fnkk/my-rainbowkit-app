import { NextApiRequest, NextApiResponse } from 'next';

let pageViews: { page: string; timestamp: string }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { page, timestamp } = req.body;
    console.log(`Page view logged: ${page} at ${timestamp}`);
    pageViews.push({ page, timestamp });
    res.status(200).json({ message: 'Page view logged successfully' });
  } else if (req.method === 'GET') {
    res.status(200).json(pageViews);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}