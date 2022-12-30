import client, { Connection, Channel } from 'amqplib';
import { IAmqp } from '../../data/types/iamqp';

export class Amqp implements IAmqp {

    public async connectAmqp() {
        return await client.connect('amqp://username:password@localhost:5672');
    }

    public async install() {

        console.log('Conectando ao RabbitMQ!');
        const connection: Connection = await this.connectAmqp();

        console.log('Criando canal!');
        const channel: Channel = await connection.createChannel();

        console.log('Criando exchange => logs');
        await channel.assertExchange('logs', 'direct', { durable: true });

        console.log('Criando fila => info');
        await channel.assertQueue('info');
        console.log('Criando fila => info_dlq');
        await channel.assertQueue('info_dlq');

        console.log('Binding => logs to info');
        await channel.bindQueue('info', 'logs', 'info');
        console.log('Binding => logs to info_dlq');
        await channel.bindQueue('info_dlq', 'logs', 'error');

        connection.close();
    }

}