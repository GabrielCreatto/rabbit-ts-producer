import { send } from '../service/producer';
import { Request, Response } from 'express';

export function sendMessage(req: Request, res: Response) {

    const fila = req.query.queue ? req.query.queue.toString() : 'info';

    const teste_erro: boolean = req.query.teste_erro === 'true' ? true : false;
    send(fila, teste_erro);

    res.send(`Sent message! Queue: ${fila}`);
}