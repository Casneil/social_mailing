import express from 'express';
import userRoutes from './routes/userRoutes';
import tweetRoutes from './routes/tweetRoutes';

const app = express();
const PORT = 5000;
app.use(express.json());
app.use('/user', userRoutes);
app.use('/tweet', tweetRoutes);


app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, () => {
	console.log(`🚀️ Server running at localhost: ${ PORT } 🚀️`);
});
