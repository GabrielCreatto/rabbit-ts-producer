import express from 'express';
import router from './app/routes/route';
import * as dotenv from 'dotenv';
import { Amqp } from './app/controllers/amqp';
dotenv.config({ path: '../.env' });

const app = express();

app.use('/', router);

async function init() {
    await new Amqp().install();
    console.log('Iniciado RabbitMQ!');

    await app.listen(3000);
    console.log('App startup! Listening on Port 3000!');
}

init();