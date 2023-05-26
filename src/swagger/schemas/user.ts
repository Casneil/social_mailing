export const userSchema = {
	type: 'object',
	required: ['email'],
	properties: {
		email: {
			type: 'string',
			description: 'Your email address',
			example: 'email.user@email.com'
		},
		tweets: {
			type: 'array',
			description: 'Array of tweets'
		},
		username: {
			type: 'string',
			description: 'User\'s username',
			example: 'foo bar'
		},
		bio: {
			type: 'string',
			description: 'Details about the user',
			example: 'I am a developer'
		},
		tokens: {
			type: 'array',
			description: 'Array of tokens'
		},
		createdAt: {
			type: 'string',
			description: 'Timestamp user accounts was created',
			example: '00:00:1234Z'
		},
		updatedAt: {
			type: 'string',
			description: 'Timestamp user accounts was updated',
			example: '00:00:1234Z'
		}
	}
};