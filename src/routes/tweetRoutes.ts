import { Router } from 'express';
import {
	INTERNAL_SERVER_ERROR,
	CREATED,
	BAD_REQUEST,
	OK,
	ACCEPTED,
	NOT_FOUND
} from '../statusCodes';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (_, res) => {
	try {
		const tweets = await prisma.tweet.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						image: true,
						username: true
					}
				} }
		});
		res.json(tweets);
	}
	catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
	}
});

router.post('/', async (req, res) => {
	try {
		const { content, image, impression, userId } = req.body;
		const result = await prisma.tweet.create({
			data: {
				content,
				image,
				impression,
				userId
			}
		});
		res.status(CREATED).json(result);
	}
	catch (error) {
		res.status(BAD_REQUEST).json({ error: 'Bad request' });
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const tweet = await prisma.tweet.findUnique({
			where: { id: Number(id) },
			include: { user: true }
		});
		res.status(OK).json(tweet);
	}
	catch (error) {
		res.status(NOT_FOUND).json({ error: `Not found ${ id }` });
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const { content, image, userId } = req.body;
		const result = await prisma.tweet.update({
			where: { id: Number(id) },
			include: { user: true },
			data: {
				content,
				image,
				userId
			}
		});
		res.status(OK).json(result);
	}
	catch (error) {
		res.status(NOT_FOUND).json({ error: `Not found ${ id }` });
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await prisma.tweet.delete({ where: { id: Number(id) } });
		res.sendStatus(ACCEPTED);
	}
	catch (error) {
		res.status(NOT_FOUND).json({ error: `Not found ${ id }` });
	}
});

export default router;
