import express, { Express, Router, Request, Response } from 'express';
import { sendMessages } from '../controllers/controller';

const router = express.Router();

export async function init_routes() {

    const app: Express = express();
    const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

    app.use('/', router);
    await app.listen(port);
    console.log(`App startup! Listening on Port ${port}!`);

}

router.get('/send', sendMessages);