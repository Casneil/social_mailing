import { PORT } from '../utils/getServerPort';

export const options = {
	definition: {
		info: {
			title: 'OpenAPI Tweets endpoints',
			description: 'OpenAPI specification For tweets api',
			version: '0.0.1'
		},
		servers: [{ url: `http://localhost:${ PORT }` }]
	},
	apis: ['./src/routes/*.ts']
};
