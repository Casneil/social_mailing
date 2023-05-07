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
		const allUsers = await prisma.user.findMany({
			include: {
				tweets: {
					select: {
						id: true,
						image: true,
						content: true,
						createdAt: true,
						updatedAt: true,
						impression: true
					}
				}
			} });
		res.json(allUsers);
	}
	catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
	}
});

router.post('/', async (req, res) => {
	try {
		const { email, name, username } = req.body;
		const result = await prisma.user.create({
			data: {
				email,
				name,
				username,
				bio: 'Hello I\'m new here!'
			}
		});
		res.status(CREATED).json(result);
	}
	catch (error) {
		res.status(BAD_REQUEST).json({ error: 'Username or email should be unique' });
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: { id: Number(id) },
			include: { tweets: {
				select: {
					id: true,
					image: true,
					content: true,
					createdAt: true,
					updatedAt: true,
					impression: true
				}
			} }
		});
		res.json(user);
	}
	catch (error) {
		res.status(NOT_FOUND).json({ error: `Not found ${ id }` });
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const { bio, name, image } = req.body;
		const result = await prisma.user.update({
			where: {
				id: Number(id)
			},
			data: {
				bio,
				name,
				image
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
		await prisma.user.delete({
			where: { id: Number(id) }
		});
		res.sendStatus(ACCEPTED).send();
	}
	catch (error) {
		res.status(NOT_FOUND).json({ error: `Not found ${ id }` });
	}
});

export default router;
