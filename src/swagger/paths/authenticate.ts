export const authenticate = {
	tags: ['authenticate'],
	summary: 'Creates or find a user\'s jwt auth token and return it',
	requestBody: {
		required: true,
		content: {
			'application/json': {
				schema: {
					'$ref': '#/components/schemas/Authenticate'
				}
			}
		}
	},
	responses: {
		200: {
			description: 'User authenticated',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						'$ref': '#/components/schemas/Authenticate'
					}
				}
			}
		},
		500: {
			description: 'Unable to create token'
		}
	}
};
