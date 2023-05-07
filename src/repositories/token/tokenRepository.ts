
import jwt from 'jsonwebtoken';
import { PrismaClient, Token, User } from '@prisma/client';
import { Request, Response } from 'express';
import {
	INTERNAL_SERVER_ERROR,
	OK,
	UNAUTHORIZED
} from '../../statusCodes';
import { mailingService } from '../../services/email/mailingService';

const prisma = new PrismaClient();

const MULTIPLICATION_FACTOR = 10000000;
const RANDOM_FACTOR = 90000000;
const EMAIL_TOKEN_EXPIRATION_MINUTES = 10 * 60 * 1000;
const AUTHENTICATION_EXPIRATION_DAYS = 2 * 24 * 60 * 1000;
const DEV_SECRET = '0e6f7f41-8bd2-4346-9335-e477a6fc3855';
const JWT_SECRET = process.env.NODE_ENV === 'dev' ? DEV_SECRET : process.env.JWT_SECRET;

const generateEmailToken = (): string => {
	return Math.floor(MULTIPLICATION_FACTOR + Math.random() * RANDOM_FACTOR).toString();
};

const generateJwtAuthToken = (tokenId: number): string => {
	const payload = { tokenId };

	return jwt.sign(payload, JWT_SECRET!, {
		algorithm: 'HS256',
		noTimestamp: true
	})
};

const createUserJwtToken = async (email: string, persistedToken: Token): Promise<string> => {
	const expiration = new Date(new Date().getTime() + AUTHENTICATION_EXPIRATION_DAYS);
	await prisma.token.update({
		where: { id: persistedToken.id },
		data: { isValidToken: false }
	});
	const apiToken = await prisma.token.create({
		data: {
			type: 'API', // Change to enum when using postgreqsl or sql database.
			expiration,
			user: {
				connect: { email }
			}
		}
	});

	return generateJwtAuthToken(apiToken.id);

}
//TODO: I stopped at: 3:23:38 on vid: https://www.youtube.com/watch?v=mABcyifdsww

const validateUser = async (res: Response, persistedToken: any, email: string): Promise<Response> => {

	if (!persistedToken || !persistedToken.isValidToken) {
		return res.status(UNAUTHORIZED).json({ error: 'Token not valid' });
	}

	if (
		persistedToken !== null &&
		persistedToken.expiration < new Date()
	) {
		return res.status(UNAUTHORIZED).json({ error: 'Token not valid' });
	}

	if (persistedToken?.user?.email !== email) {
		return res.sendStatus(UNAUTHORIZED);
	}

	const jwtToken = await createUserJwtToken(email, persistedToken);

	return res.status(OK).json({ authToken: jwtToken });
}

export const createOrConnectToken = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { email } = req.body;
		const emailToken = generateEmailToken();
		const expiration = new Date(new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES);
		const userToken = await prisma.token.create({
			data: {
				type: 'EMAIL', // Change to enum when using postgreqsl or sql database.
				emailToken,
				expiration,
				user: {
					connectOrCreate: {
						where: { email },
						create: { email }
					}
				}
			}
		});
		return res.status(OK).json(userToken);
	}

	catch (error) {
		return res.status(INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
	}

}

export const getPersistedTokenUser = async (req: Request, res: Response): Promise<Response> => {
	const { email, emailToken } = req.body;
	const persistedToken = await prisma.token.findUnique({
		where: {
			emailToken,
		},
		include: {
			user: true
		}
	});

	return validateUser(res, persistedToken, email);
}
