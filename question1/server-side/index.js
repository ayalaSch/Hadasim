import express from 'express';
import cors from 'cors';
import { memberRouter } from './routes/memberRouter.js'
import { vaccineRouter } from './routes/vaccinesRouter.js';

const app = express();
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000;

app.use('/members', memberRouter)
app.use('/vaccines', vaccineRouter)
app.listen(port)