export const user = {
	tags: ['user'],
	summary: 'Creates a user account',
	requestBody: {
		required: true,
		content: {
			'application/json': {
				schema: {
					'$ref': '#/components/schemas/User'
				}
			}
		}
	},
	responses: {
		200: {
			description: 'User created successfully',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						'$ref': '#/components/schemas/User'
					}
				}
			}
		},
		500: {
			description: 'Internal server error'
		},
		401: {
			description: 'Unauthorized'
		},
		400: {
			description: 'Bad request'
		}
	}
};
