import express, { Express, Router } from 'express';
import { sendMessage } from '../controllers/controller';

export async function init_routes() {

    const app: Express = express();
    const router: Router = express.Router();
    const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

    router.get('/send', sendMessage);
    await app.listen(port);
    console.log(`App startup! Listening on Port ${port}!`);

}