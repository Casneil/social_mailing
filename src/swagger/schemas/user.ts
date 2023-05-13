export const userSchema = {
	type: 'object',
	required: ['name'],
	properties: {
		name: {
			type: 'string',
			description: 'Your email address',
			example: 'Casneil Simpson'
		}
	}
};
