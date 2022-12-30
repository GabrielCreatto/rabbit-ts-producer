import { Connection } from 'amqplib';

export interface IAmqp {
    connectAmqp: () => Promise<Connection>
}