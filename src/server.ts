import cors from 'cors';
import express from 'express';
import 'dotenv/config';

import { connectDatabase } from './db/connectDb.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import contactsRoutes from './routes/contactsRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/contacts', contactsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;

await connectDatabase();

app.listen(port, () => console.warn(`Server running on port ${port}`));
