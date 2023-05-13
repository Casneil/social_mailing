export const login = {
	tags: ['login'],
	summary: 'Creates a one time password and send it to the user email',
	requestBody: {
		required: true,
		content: {
			'application/json': {
				schema: {
					'$ref': '#/components/schemas/Login'
				}
			}
		}
	},
	responses: {
		200: {
			description: 'Token send to user',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						'$ref': '#/components/schemas/Login'
					}
				}
			}
		},
		500: {
			description: 'Unable to create token'
		}
	}
};
