import { Connection, Channel } from 'amqplib';
import { Amqp } from '../controllers/amqp';

const sendMessages = (channel: Channel, queue: string, exchange: string, key = 'info') => {
    for (let i = 0; i < 10; i++) {
        channel.publish(exchange, key, Buffer.from(`message ${i}`));
    }
};

export const send = async (queue: string, teste_erro: boolean, exchange = 'logs') => {
    const amqp = new Amqp();
    const connection: Connection = await amqp.connectAmqp();
    const channel: Channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(queue);
    await channel.bindQueue(queue, exchange, 'info');

    try {
        if (!teste_erro) {
            sendMessages(channel, queue, exchange);
        } else {
            throw 'Falha no envio da mensagem!';
        }
    } catch (error) {
        console.log(error);
        const queue_dlq = 'info_dlq';
        const opts = {
            'error': error,
            'origem': 'send'
        };
        const header = {
            headers: opts
        };

        await channel.assertQueue(queue_dlq);
        await channel.bindQueue(queue_dlq, exchange, 'error');

        channel.publish(exchange, 'error', Buffer.from('message'), header);
    }
};

// async function send(req: Request, res: Response) {
//     try {
//         const connection: Connection = await createAmqpConnection();
//         const channel: Channel = await createAmqpChannel(await connection);
//         if (req.query.queue && req.query.msg) {
//             await channel.assertQueue(req.query.queue.toString());
//             sendMessage(channel, req.query.queue.toString(), req.query.msg.toString());
//         }
//         connection.close();
//         res.send(`Send message ${req.query.queue}`);
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }
// }