
import jwt from 'jsonwebtoken';
import { PrismaClient, Token } from '@prisma/client';
import { Request, Response } from 'express';
import { getJwtSecret } from '../../utils/getSecrets';
import { sendEmailToAuthenticateUser } from '../../services/email/mailingService';
import { replaceString } from '../../utils/replaceString';
import {
	INTERNAL_SERVER_ERROR,
	OK,
	UNAUTHORIZED
} from '../../statusCodes';

import {
	AUTHENTICATION_EXPIRATION_DAYS,
	MULTIPLICATION_FACTOR,
	RANDOM_FACTOR,
	EMAIL_TOKEN_EXPIRATION_MINUTES,
	EMAIL_CONFIG
} from '../../constants';

const prisma = new PrismaClient();

const generateEmailToken = (): string => {
	return Math.floor(MULTIPLICATION_FACTOR + Math.random() * RANDOM_FACTOR)
		.toString();
};

const generateJwtAuthToken = (tokenId: number): string => {
	const payload = { tokenId };

	return jwt.sign(payload, getJwtSecret(), {
		algorithm: 'HS256',
		noTimestamp: true
	})
};

const createUserJwtToken = async (
	email: string,
	persistedToken: Token
	): Promise<string> => {

	const expiration = new Date(new Date().getTime() + AUTHENTICATION_EXPIRATION_DAYS);
	await prisma.token.update({
		where: { id: persistedToken.id },
		data: { isValidToken: false }
	});
	const apiToken = await prisma.token.create({
		data: {
			type: 'API', //TODO: Change to enum when using postgreqsl or sql database.
			expiration,
			user: {
				connect: { email }
			}
		}
	});

	return generateJwtAuthToken(apiToken.id);

}

const validateUser = async (
	res: Response, persistedEmailToken: any,
	email: string
	) : Promise<Response> => {

	if (!persistedEmailToken || !persistedEmailToken.isValidToken) {
		return res.status(UNAUTHORIZED).json({ error: 'Token not valid' });
	}

	if (
		persistedEmailToken !== null &&
		persistedEmailToken.expiration < new Date()
	) {
		return res.status(UNAUTHORIZED).json({ error: 'Token not valid' });
	}

	if (persistedEmailToken?.user?.email !== email) {
		return res.sendStatus(UNAUTHORIZED);
	}

	const jwtToken = await createUserJwtToken(email, persistedEmailToken);

	return res.status(OK).json({ authToken: jwtToken });
}

export const createOrConnectToken = async (
	req: Request,
	res: Response
	): Promise<Response> => {

	try {
		const { email, sendEmail = true } = req.body;
		const emailToken = generateEmailToken();
		const expiration = new Date(new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES);
		const userToken = await prisma.token.create({
			data: {
				type: 'EMAIL', //TODO: Change to enum when using postgreqsl or sql database.
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

		//TODO: Add better error handling
		if (typeof sendEmail !== 'boolean' || typeof email !== 'string') {

			return res.status(INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
		}

		if (userToken.emailToken && sendEmail) {
			const isDev = process.env.NODE_ENV === 'dev';
			const sender = process.env.EMAIL_SENDER ? process.env.EMAIL_SENDER : '';
			const recipient = isDev ? sender : email;

			await sendEmailToAuthenticateUser({
				...EMAIL_CONFIG,
				to: recipient,
				subject: replaceString(EMAIL_CONFIG.subject, '{code}', userToken.emailToken),
				html: replaceString(EMAIL_CONFIG.subject, '{code}', userToken.emailToken),
			});
		}

		return res.status(OK).json({ emailToken: userToken.emailToken });
	}
	catch (error) {
		return res.status(INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
	}

}

export const getPersistedEmailTokenUser = async (
	req: Request,
	res: Response
	): Promise<Response> => {

	const { email, emailToken } = req.body;
	const persistedEmailToken = await prisma.token.findUnique({
		where: {
			emailToken,
		},
		include: {
			user: true
		}
	});

	return validateUser(res, persistedEmailToken, email);
}
