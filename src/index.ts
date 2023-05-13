import express from 'express';
import swaggerUI from 'swagger-ui-express';
import userRoutes from './routes/userRoutes';
import tweetRoutes from './routes/tweetRoutes';
import authRoute from './routes/authRoute';
import { authenticateUser } from './middlewares/auth';
import { specs } from './swagger/index';
import { PORT } from './utils/getServerPort';

const app = express();

app.use(express.json());
app.use('/api/user', authenticateUser, userRoutes);
app.use('/api/tweet', authenticateUser, tweetRoutes);
app.use('/api/auth', authRoute);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.listen(PORT, () => {
	if (process.env.NODE_ENV === 'dev') {
		console.log(`🚀️ Server running at: ${ PORT } 🚀️`);
	}
});
