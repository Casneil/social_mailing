import express from 'express';
import userRoutes from './routes/userRoutes';
import tweetRoutes from './routes/tweetRoutes';
import { OK } from './statusCodes';

const app = express();
const PORT = 5000;
app.use(express.json());
app.use('/user', userRoutes);
app.use('/tweet', tweetRoutes);


app.get('/', (req, res) => {
	res.status(OK).send('Hello World');
});

app.listen(PORT, () => {
	console.log(`🚀️ Server running at localhost: ${ PORT } 🚀️`);
});
