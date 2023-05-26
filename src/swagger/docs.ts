import { PORT } from '../utils/getServerPort';
import { userSchema } from './schemas/user';
import { loginSchema } from './schemas/login';
import { login } from './paths/login';
import { user } from './paths/user';

export const docs = {
	openapi: '3.0.3',
	info: {
		title: 'OpenAPI Tweets endpoints',
		description: 'OpenAPI specification For tweets api',
		version: '1.0.0'
	},
	servers: [{ url: `http://localhost:${PORT}` }],
	components: {
		schemas: {
			Login: loginSchema,
			User: userSchema
		}
	},
	paths: {
		'/api/auth/login': {
			post: login
		},
		'/api/user/': {
			post: user
		}
	}
};

