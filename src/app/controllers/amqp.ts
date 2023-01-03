import client, { Connection, Channel } from 'amqplib';
import { IAmqp } from './iamqp';

export class Amqp implements IAmqp {

    public async connectAmqp() {
        return await client.connect(process.env.AMQP_HOST!.toString());
    }

    public async install() {

        console.log('Connecting to RabbitMQ!');
        const connection: Connection = await this.connectAmqp();

        console.log('Creating channel!');
        const channel: Channel = await connection.createChannel();

        console.log('Creating exchange: logs');
        await channel.assertExchange('logs', 'direct', { durable: true });

        console.log('Creating queue: info');
        await channel.assertQueue('info');
        console.log('Creating queue: info_dlq');
        await channel.assertQueue('info_dlq');

        console.log('Binding: logs to info');
        await channel.bindQueue('info', 'logs', 'info');
        console.log('Binding: logs to info_dlq');
        await channel.bindQueue('info_dlq', 'logs', 'error');

        connection.close();
        console.log('RabbitMQ Started!');
    }

}