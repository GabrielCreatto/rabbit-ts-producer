import { init_routes } from './app/routes/route';
import { Amqp } from './app/controllers/amqp';
import dotenv from 'dotenv';
dotenv.config();

async function init() {
    await new Amqp().install();
    await init_routes();
}

init();