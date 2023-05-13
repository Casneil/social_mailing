import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UNAUTHORIZED } from '../statusCodes';
import { PrismaClient } from '@prisma/client';
import { getJwtSecret } from '../utils/getSecrets';
import { AuthRequest } from '../types/authRequest';

const prisma = new PrismaClient();

export const authenticateUser = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
	) => {
	const authBearer = req.headers['authorization'];
	const jwtToken = authBearer !== undefined && authBearer.split(' ')[1];
	if (!jwtToken) {
		return res.sendStatus(UNAUTHORIZED);
	}

	try {
		const payload = (jwt.verify(jwtToken, getJwtSecret())) as { tokenId: number };
		const dbToken = await prisma.token.findUnique({
			where: { id: payload.tokenId },
			include: { user: true }
		});

		if (!dbToken?.isValidToken || dbToken.expiration < new Date()) {
			return res.status(UNAUTHORIZED).json({ error: 'Authentication failed' })
		}

		req.user = dbToken.user;
	}
	catch (error) {
		return res.sendStatus(UNAUTHORIZED);
	}

	next();
};