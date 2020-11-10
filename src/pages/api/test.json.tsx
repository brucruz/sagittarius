import { NextApiRequest, NextApiResponse } from 'next';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    // Set response header
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.setHeader('Content-Encoding', 'gzip');

    res.write('hello');
  } catch {
    res.setHeader('content-type', 'application/json');

    res.json({ success: false });
  }
};
