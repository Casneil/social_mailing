import express from 'express';
import userRoutes from './routes/userRoutes';
import tweetRoutes from './routes/tweetRoutes';
import authRoute from './routes/authRoute';
import { authenticateUser } from './middlewares/auth';

const app = express();
const PORT_DEV = 5000;
const PORT = process.env.NODE_ENV === 'dev' ? PORT_DEV : process.env.PORT;

app.use(express.json());
app.use('/api/user', authenticateUser, userRoutes);
app.use('/api/tweet', authenticateUser, tweetRoutes);
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
	if (process.env.NODE_ENV === 'dev') {
		console.log(`🚀️ Server running at: ${ PORT } 🚀️`);
	}
});
