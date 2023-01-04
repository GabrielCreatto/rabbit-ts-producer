import { send } from '../service/producer';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/send', (req: Request, res: Response) => {
    const fila = req.query.queue ? req.query.queue.toString() : 'info';

    const teste_erro: boolean = req.query.teste_erro === 'true' ? true : false;
    send(fila, teste_erro);

    res.send(`Sent message to queue ${fila}!`);
});

export default router;