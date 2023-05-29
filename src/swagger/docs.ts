import { PORT } from '../utils/getServerPort';
import { userSchema } from './schemas/user';
import { loginSchema } from './schemas/login';
import { authenticateSchema } from './schemas/authenticate';
import { login } from './paths/login';
import { user } from './paths/user';
import { authenticate } from './paths/authenticate';

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
			User: userSchema,
			Authenticate: authenticateSchema
		}
	},
	paths: {
		'/api/auth/login': {
			post: login
		},
		'/api/auth/authenticate': {
			post: authenticate
		},
		'/api/user/': {
			post: user
		}
	}
};

