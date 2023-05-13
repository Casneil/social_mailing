export const loginSchema = {
	type: 'object',
	required: ['email'],
	properties: {
		email: {
			type: 'string',
			description: 'Your email address',
			example: 'example@mail.com'
		}
	}
};
