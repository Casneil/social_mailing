import { Secret  } from 'jsonwebtoken';

export const getJwtSecret = (): Secret => {
	const DEV_SECRET = '0e6f7f41-8bd2-4346-9335-e477a6fc3855';
	const JWT_SECRET = process.env.NODE_ENV === 'dev' ? DEV_SECRET : process.env.JWT_SECRET as Secret;

	return JWT_SECRET;
}