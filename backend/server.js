import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passworRoutes from './routes/passwordRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

const app = express();

dotenv.config(); // Load environment variables from .env file
dotenv.config({ path: './backend/.env' });

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Use the data routes
app.use('/api/data', passworRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://wentzelevent.dk:${PORT}`);
});

export default app;
