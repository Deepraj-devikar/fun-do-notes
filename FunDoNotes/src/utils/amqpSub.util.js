import * as amqplib from 'amqplib';
import { sendMail } from './mail.util';
import logger from '../config/logger';

const amqpSubscriber = () => {
    (async () => {
        const mailQueue = 'mailTasks';
        try{
            const connection = await amqplib.connect('amqp://localhost');
            const channel = await connection.createChannel();
            await channel.assertQueue(mailQueue);

            channel.consume(mailQueue, (message) => {
                if (message !== null) {
                    const data = JSON.parse(message.content.toString());
                    logger.info(`MAIL QUEUE RECIVED : MAIL`);
                    sendMail(data);
                    channel.ack(message);
                } else {
                    logger.debug("Consumer cancelled by server");
                }
            });
        } catch (error) {
            logger.error("Error: in amqp subscriber launching");
        }
    })();
}

amqpSubscriber();