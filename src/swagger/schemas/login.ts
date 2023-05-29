export const loginSchema = {
	type: 'object',
	required: ['email'],
	properties: {
		email: {
			type: 'string',
			description: 'Your email address',
			example: 'example@mail.com'
		},
		sendEmail: {
			type: 'boolean',
			description: 'Boolean value which determines if an email be send to the user\'s email address. Defaults to true',
			example: 'true'
		}
	}
};
