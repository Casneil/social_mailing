import { userSchema } from './schemas/user';
import { loginSchema } from './schemas/login';

export const docs = {
	openapi: '3.0.3',
	info: {
		title: 'OpenAPI Tweets endpoints',
		description: 'OpenAPI specification For tweets api',
		version: '0.0.1'
	},
	components: {
		schemas: {
			Login: loginSchema,
			User: userSchema
		}
	},
	paths: {
		'/api/auth/login': {
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
		}
	}
};

