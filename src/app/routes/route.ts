import { Router } from 'express';
import { sendMessage } from '../controllers/controller';

const routes = Router();

routes.get('/send', sendMessage);

export default routes;