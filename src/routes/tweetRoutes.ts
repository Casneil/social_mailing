import { Router, Request, Response } from 'express';
import { NOT_IMPLEMENTED } from '../statusCodes';

const router = Router();

router.post('/', (req: Request, res: Response) => {
	res.status(NOT_IMPLEMENTED).json({ error: 'Not implemented' });
});

router.get('/', (req: Request, res: Response) => {
	res.status(NOT_IMPLEMENTED).json({ error: 'Not implemented' });
});

router.get('/:id', (req: Request, res: Response) => {
	const { id } = req.params;
	res.status(NOT_IMPLEMENTED).json({ error: `Not implemented ${ id }` });
});

router.put('/:id', (req: Request, res: Response) => {
	const { id } = req.params;
	res.status(NOT_IMPLEMENTED).json({ error: `Not implemented ${ id }` });
});

router.delete('/:id', (req: Request, res: Response) => {
	const { id } = req.params;
	res.status(NOT_IMPLEMENTED).json({ error: `Not implemented ${ id }` });
});

export default router;
