export const authenticateSchema = {
	type: 'object',
	required: ['email', 'emailToken'],
	properties: {
		email: {
			type: 'string',
			description: 'Your email address',
			example: 'example@mail.com'
		},
		emailToken: {
			type: 'string',
			description: 'Generated email token',
			example: '123456'
		}
	}
};
