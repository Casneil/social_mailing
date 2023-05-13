<<<<<<< HEAD
import { PORT } from '../utils/getServerPort';
import { userSchema } from './schemas/user';
import { loginSchema } from './schemas/login';
import { login } from './paths/login';
import { user } from './paths/user';
=======
import { userSchema } from './schemas/user';
import { loginSchema } from './schemas/login';
>>>>>>> e279e55 (setting up swagger)

export const docs = {
	openapi: '3.0.3',
	info: {
		title: 'OpenAPI Tweets endpoints',
		description: 'OpenAPI specification For tweets api',
<<<<<<< HEAD
		version: '1.0.0'
	},
	servers: [{ url: `http://localhost:${PORT}` }],
=======
		version: '0.0.1'
	},
>>>>>>> e279e55 (setting up swagger)
	components: {
		schemas: {
			Login: loginSchema,
			User: userSchema
		}
	},
	paths: {
		'/api/auth/login': {
<<<<<<< HEAD
			post: login
		},
		'/api/user/': {
			post: user
=======
			post: {
				summary: 'Creates a one time password and send it to the user email',
				tags: ['Login'],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								'$ref': '#/components/schemas/Login'
							},
							responses: {
								200: {
									description: 'Token send to user',
									content: {
										'application/json': {
											schema: {
												type: 'array',
												'$ref': '#/components/schemas/Login'
											}
										}
									}
								},
								500: {
									description: 'Something went wrong'
								}
							}
						}
					}
				}
			}
>>>>>>> e279e55 (setting up swagger)
		}
	}
};

