import { Router, Request, Response } from 'express';
import toolsData from '../data/toolsContent.json';
import slugify from '../utils/slugify';

const router = Router();

// Convert object to array
const tools = Object.entries(toolsData).map(([slug, data]) => ({
  slug,
  ...(data as any),
}));

router.get('/', (_req: Request, res: Response) => {
  res.json(tools);
});

router.get('/:slug', (req: Request, res: Response) => {
  const tool = tools.find((t) => t.slug === req.params.slug);
  if (!tool) return res.status(404).json({ message: 'Tool not found' });
  res.json(tool);
});

export default router;