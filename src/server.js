import express from 'express';
import path from 'path';
import 'dotenv/config';
import Routes from './routes/routes.js';

const app = express()
app.use(Routes);
app.use('/images', express.static(path.resolve('uploads/images')));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.SERVER_PORT}`)
})