import { PORT } from '../utils/getServerPort';

export const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Api specifications',
			version: '1.0.0',
			description: ''
		},
		servers: [
			{
				url: `http://localhost:${ PORT }`
			}
		]
	},
	apis: ['./src/routes/*.ts']
};
